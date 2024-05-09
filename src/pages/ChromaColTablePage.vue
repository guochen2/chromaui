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
          <q-td>
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
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import sha256 from 'crypto-js/sha256';
import {
  getApiV1CollectionsByCollectionIdCount,
  getApiV1CollectionsByCollectionName,
  postApiV1CollectionsByCollectionIdDelete,
  postApiV1CollectionsByCollectionIdGet,
} from 'src/server/controller';
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
const unfold = ref(false);

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
  const res = (await postApiV1CollectionsByCollectionIdGet(
    { collection_id: cuCon.value.id },
    {
      include: ['documents', 'metadatas'],
      offset: offset,
      limit: pagination.value.rowsPerPage,
    },
    { baseURL: prop.url }
  )) as any;
  let arr = [];
  for (let i = 0; i < res.data.ids.length; i++) {
    arr.push({
      id: res.data.ids[i],
      document: res.data.documents[i],
      metadata: JSON.stringify(res.data.metadatas[i]),
    });
  }
  await getTotal();
  proxy?.$loading.hide();
  rows.value = arr;
}
async function getTotal() {
  let res = await getApiV1CollectionsByCollectionIdCount(
    { collection_id: cuCon.value.id },
    { baseURL: prop.url }
  );
  pagination.value.rowsNumber = res.data as number;
}

onMounted(() => {
  pagination.value.page = 1;
  // get initial data from server (1st page)
  tableRef.value.requestServerInteraction();
});
const crows = computed(() => {
  if (unfold.value) {
    return rows.value;
  } else {
    let row: any[] = [];
    _.cloneDeep(rows.value).forEach((a: any) => {
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
    let res = await postApiV1CollectionsByCollectionIdDelete(
      {
        collection_id: cuCon.value.id,
      },
      { ids: [row['id']] },
      { baseURL: prop.url }
    );
    proxy?.$loading.hide();
    getData();
  });
};
defineExpose({ changeCon });
</script>
