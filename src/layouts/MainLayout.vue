<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="chroma.svg" />
          </q-avatar>
          ChromaUI
        </q-toolbar-title>
        v{{ version }}
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/" label="Main" />
        <!-- <q-route-tab to="/home" label="Home" /> -->
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script lang="ts" setup>
import config from '../../package.json';
import { ref } from 'vue';
const version = ref(config.version);
</script>
