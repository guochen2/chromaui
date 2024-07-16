<template>
  <div>
    <div class="row">
      <label class="col-3"
        >{{ baseUrl }} {{ chromaVersion ? `v${chromaVersion}` : '' }}</label
      >
      <div class="row col-8">
        <q-input label="database" v-model="database" />

        <div>
          <q-btn
            color="secondary"
            class="mt30"
            size="sm"
            label="default"
            rou
            unelevated
            @click="database = 'default_database'"
          />
        </div>

        <q-input class="ml30" label="tenant" v-model="tenant" />
        <div>
          <q-btn
            color="secondary"
            class="mt30"
            size="sm"
            label="default"
            rou
            unelevated
            @click="tenant = 'default_tenant'"
          />
        </div>
        <q-btn
          color="primary"
          class="mt15 ml30"
          icon="search"
          round
          unelevated
          @click="Init"
        />
      </div>
    </div>
    <div class="row justify-evenly">
      <VChromaColPage :list="conList" @changeCon="changeCon" class="rol-3" />
      <VChromaColTablePage
        ref="VChromaColTableRef"
        :con="cuCon"
        :url="baseUrl"
        class="col-9"
      />
    </div>
  </div>
</template>
<script setup>
import { getCurrentInstance, onMounted, ref, nextTick } from 'vue';
import VChromaColPage from './ChromaColPage.vue';
import VChromaColTablePage from './ChromaColTablePage.vue';
import { BaseAxios } from 'src/api-services/baseAxios';

onMounted(() => {
  Init();
});
const baseUrl = ref('');
const proxy = getCurrentInstance().proxy;
const baseConfig = {
  baseURL: '',
};
const tenant = ref('default_tenant');
const database = ref('default_database');
const conList = ref([]);
const cuCon = ref(null);
const VChromaColTableRef = ref();
const chromaVersion = ref('');
const Init = async () => {
  if (!baseUrl.value) return;
  conList.value = [];
  proxy.$loading.show();
  if (!chromaVersion.value) {
    let rv = await getVersion();
    if (!rv) {
      proxy.$loading.hide();
      return;
    }
  }
  let collectres = await new BaseAxios(baseUrl.value).api.api.listCollections({
    tenant: tenant.value,
    database: database.value,
  });
  VChromaColTableRef.value.reset();
  conList.value = collectres.data;
  proxy.$loading.hide();
};
const getVersion = async () => {
  let res = await new BaseAxios(baseUrl.value).api.api.version();
  if (res.status == 1) {
    chromaVersion.value = res.data;
    return true;
  } else {
    proxy.$message.failtip(res.message);
    return false;
  }
};
const changeCon = (con) => {
  cuCon.value = con;
  VChromaColTableRef.value.changeCon(con);
};
const changeUrl = (url) => {
  baseUrl.value = url;
  baseConfig.baseURL = url;
  Init();
};
defineExpose({ changeUrl });
</script>
