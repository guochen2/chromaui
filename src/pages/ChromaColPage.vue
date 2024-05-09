<template>
  <div class="q-pa-md" style="max-width: 350px">
    <div class="row">
      <q-input
        class="ml5 col-10"
        v-model="skey"
        placeholder="search key"
      ></q-input>
    </div>
    <div class="row mt10">
      <q-badge
        outline
        color="primary"
        :label="`Total : ${list.length}`"
        class="mb20"
      />
    </div>
    <q-list bordered>
      <q-virtual-scroll
        style="max-height: 700px"
        :items="alList"
        separator
        v-slot="{ item }"
      >
        <q-btn no-caps @click="clickCon(item)" flat>{{ item.name }}</q-btn>
      </q-virtual-scroll>
    </q-list>
  </div>
</template>

<script setup>
import { watch, computed, ref } from 'vue';
const prop = defineProps({
  list: Object,
});
const skey = ref('');
const emit = defineEmits(['changeCon']);
const clickCon = (d) => {
  emit('changeCon', d);
};
const alList = computed(() => {
  if (!skey.value) return prop.list;
  return prop.list.filter(
    (a) => a.name.toLowerCase().indexOf(skey.value.toLowerCase()) > -1
  );
});
</script>
