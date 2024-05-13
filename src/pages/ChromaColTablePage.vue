<template>
  <div class="q-pa-md">
    <q-toggle v-model="unfold" label="unfold" />
    <q-table
      flat
      bordered
      ref="tableRef"
      :rows="crows"
      :columns="columns"
      row-key="id"
      v-model:pagination="pagination"
      wrap-cells
      @request="onRequest"
      :rows-per-page-options="[10, 20, 50]"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <!-- <q-td>{{props.row}}</q-td> -->
          <q-td>{{ props.row['id'] }}</q-td>
          <q-td>{{ props.row['document'] }}</q-td>
          <q-td>{{ props.row['metadata'] }}</q-td>
          <q-td
            ><q-btn
              flat
              icon="visibility"
              color="green"
              @click="showJsonData(props.row)"
              size="md"
              round />
            <q-btn
              flat
              icon="delete"
              color="red"
              @click="removeRow(props.row)"
              size="md"
              round
          /></q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog
      v-model="jsonDialog"
      transition-show="slide-down"
      transition-hide="slide-up"
    >
      <q-card style="width: 1300px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">{{ jsondata.id }}</div>
        </q-card-section>
        <q-card-section class="row items-center">
          <q-btn
            flat
            label="Copy"
            color="primary"
            icon="content_copy"
            @click="copy(jsondata)"
          />
          <json-viewer
            v-if="jsonDialog"
            :value="jsondata"
            :expand-depth="5"
            boxed
            expanded
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import sha256 from 'crypto-js/sha256';
import {
  ref,
  onMounted,
  getCurrentInstance,
  ComponentInternalInstance,
  computed,
  watch,
} from 'vue';
import { useQuasar } from 'quasar';
import Enumerable from 'linq';
import { BaseAxios } from 'src/api-services/baseAxios';
const unfold = ref(false);
const jsonDialog = ref(false);
const proxy = (getCurrentInstance() as ComponentInternalInstance).proxy;
const _linq = Enumerable.from;
const columns = [
  {
    name: 'id',
    required: true,
    align: 'center',
    label: 'id',
    field: 'id',
    style: 'width: 100px',
  },
  {
    name: 'document',
    align: 'center',
    label: 'document',
    field: 'document',
    style: 'width: 300px',
  },
  {
    name: 'metadata',
    align: 'center',
    label: 'metadata',
    field: 'metadata',
    style: 'width: 500px',
  },
  {
    name: 'operation',
    align: 'right',
    label: 'operation',
    field: 'operation',
  },
] as any;
const prop = defineProps({
  url: String,
});
const cuCon = ref<any>(null);
const tableRef = ref();
const rows = ref<any[]>([]);
const filter = ref('');
const $q = useQuasar();
const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 10,
});
const onRequest = (p: any) => {
  pagination.value = p.pagination;
  getData();
};
async function getData() {
  if (!cuCon.value) return;
  proxy?.$loading.show();
  let offset = (pagination.value.page - 1) * pagination.value.rowsPerPage;
  const res = (await new BaseAxios(prop.url as string).api.api.get(
    cuCon.value.id,
    {
      body: {
        include: ['documents', 'metadatas'],
        offset: offset,
        limit: pagination.value.rowsPerPage,
      },
    } as any
  )) as any;
  proxy?.$loading.hide();
  if (res.status != 1) {
    proxy?.$message.failtip(res.message);
    return;
  }
  let arr = [];
  for (let i = 0; i < res.data.ids.length; i++) {
    arr.push({
      id: res.data.ids[i],
      document: res.data.documents[i],
      metadata: res.data.metadatas[i],
    });
  }
  await getTotal();
  rows.value = arr;
}
async function getTotal() {
  proxy?.$loading.show();
  let res = (await new BaseAxios(prop.url as string).api.api.count(
    cuCon.value.id
  )) as any;
  if (res.status == 1) {
    pagination.value.rowsNumber = res.data as number;
  } else {
    proxy?.$message.failtip(res.message);
  }
  proxy?.$loading.hide();
}

onMounted(() => {
  pagination.value.page = 1;
  // get initial data from server (1st page)
  tableRef.value.requestServerInteraction();
});
const crows = computed(() => {
  let cd = _.cloneDeep(rows.value);
  cd.forEach((a: any) => {
    if (_.isObject(a.document)) a.document = JSON.stringify(a.document);
    if (_.isObject(a.metadata)) a.metadata = JSON.stringify(a.metadata);
  });
  if (unfold.value) {
    return cd;
  } else {
    let row: any[] = [];
    _.cloneDeep(cd).forEach((a: any) => {
      a.document = proxy?.$util.ellipsis(a.document);
      a.metadata = proxy?.$util.ellipsis(a.metadata);
      row.push(a);
    });
    return row;
  }
});
const changeCon = (con: any) => {
  cuCon.value = con;
  getData();
};
const removeRow = (row: any) => {
  $q.dialog({
    title: 'Confirm deletion',
    message: `Are you sure to delete data with id ${row['id']}?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    proxy?.$loading.show();
    let res = await new BaseAxios(prop.url as string).api.api.delete(
      cuCon.value.id,
      { body: { ids: [row['id']] } } as any
    );
    proxy?.$loading.hide();
    getData();
  });
};
const jsondata = ref<any>([]);
const showJsonData = (row: any) => {
  let cd = _.cloneDeep(rows.value.first((a: any) => a.id == row.id));
  try {
    cd.document = JSON.parse(cd.document);
  } catch (e) {}

  jsondata.value = cd;
  jsonDialog.value = true;
};
const copy = (d: any) => {
  navigator.clipboard.writeText(JSON.stringify(d));
  proxy?.$message.successtip('已复制到剪贴板');
};
defineExpose({ changeCon });
</script>
