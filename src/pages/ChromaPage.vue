<template>
  <div>
    <div>
      <label>{{ baseUrl }}</label>
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
const conList = ref([]);
const cuCon = ref(null);
const VChromaColTableRef = ref();
const Init = async () => {
  if (!baseUrl.value) return;
  conList.value = [];
  proxy.$loading.show();
  let res = await new BaseAxios(baseUrl.value).api.api.version();
  if (res.status == 1) {
    proxy.$message.successtip(res.data);
    let collectres = await new BaseAxios(
      baseUrl.value
    ).api.api.listCollections();
    conList.value = collectres.data;
  } else {
    proxy.$message.failtip(res.message);
  }
  proxy.$loading.hide();
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
