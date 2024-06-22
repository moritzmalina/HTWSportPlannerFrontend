<script setup lang="ts">
const props = defineProps({
  tag: String})
import {kurse} from "@/scraper/testdata";
</script>

<template>
      <h5>{{ tag }}</h5>

  <ul v-for="kurs in kurse" :key="kurs.courseName">
    <li v-if="kurs.weekDay === tag && kurs.selected">
      {{ kurs.courseName }} <br>
      {{kurs.place}} <br>
      {{kurs.courseTime}}
    </li>
  </ul>

</template>

<style scoped>


</style>