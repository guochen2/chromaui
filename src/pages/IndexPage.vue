<template>
  <q-page class="">
    <div class="row justify-evenly mt50 mb50">
      <q-input
        class="col-7"
        bottom-slots
        v-model="chromaUrl"
        placeholder="http://127.0.0.1:8000"
        label="Chroma Url"
        counter
      >
        <template v-slot:append>
          <q-icon
            v-if="chromaUrl !== ''"
            name="close"
            @click="chromaUrl = ''"
            class="cursor-pointer"
          />
        </template>

        <template v-slot:after>
          <q-btn round dense flat icon="send" @click="Enter" />
        </template>
      </q-input>
    </div>
    <div class="row justify-evenly">
      <div class="mt10 mb20" v-for="(d, i) in allCon" :key="i">
        <q-btn no-caps @click="goCon(d)">{{ d.url }}</q-btn
        ><q-btn class="ml5" icon="delete" @click="removeCon(d)"></q-btn>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { LocalStorage, SessionStorage } from 'quasar';

import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const allCon = ref<Array<any>>([]);
const chromaUrl = ref('');
const Enter = () => {
  if (!chromaUrl.value) return;
  allCon.value.push({ url: chromaUrl.value });
  LocalStorage.set('AllCon', allCon.value);
};
const goCon = (d: any) => {
  SessionStorage.set('CuUri', d.url);
  router.push('/home');
};
const removeCon = (d: any) => {
  allCon.value.remove(d);
  LocalStorage.set('AllCon', allCon.value);
};
onMounted(() => {
  let cons = (LocalStorage.getItem('AllCon') ?? []) as Array<any>;
  allCon.value = cons;
});
</script>
