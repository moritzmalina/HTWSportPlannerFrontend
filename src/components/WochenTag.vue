<script setup lang="ts">
const props = defineProps({
  tag: String})
import {kurse} from "@/scraper/testdata";
</script>

<template>
      <h5>{{ tag }}</h5>

  <ul v-for="kurs in kurse" :key="kurs.name">
    <li v-if="kurs.tag === tag && kurs.selected">
      {{ kurs.name }} <br>
      {{kurs.ort}} <br>
      {{kurs.zeit}}
    </li>
  </ul>

</template>

<style scoped>


</style>