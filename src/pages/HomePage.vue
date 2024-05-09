<template>
  <q-page>
    <div class="mt30 ml30">
      <div class="row justify-evenly"></div>
      <VChroma ref="VChromaRef" />
    </div>
  </q-page>
</template>
<script setup>
import { LocalStorage, SessionStorage } from 'quasar';
import { onMounted, ref } from 'vue';
import VChroma from './ChromaPage.vue';
let chromaUrl = '';
onMounted(() => {
  chromaUrl = SessionStorage.getItem('CuUri');
  VChromaRef.value.changeUrl(chromaUrl);
});
const VChromaRef = ref();
</script>
