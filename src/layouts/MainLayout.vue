<template>
  <q-layout view="hHh lpR fFf" class="bg-color">


    <div>
       <tool-bars/>
    </div>

    <q-page-container  >
      <router-view />
    </q-page-container>

  </q-layout>
</template>
<script lang='ts' setup>
import ToolBars from 'src/components/ToolBars.vue'
</script>
