<script setup lang="ts">
import { myCourses } from '@/scraper/testdata';
const props = defineProps({
  tag: String})
</script>

<template>
      <h5>{{ tag }}</h5>
      <ul v-for="course in myCourses" :key="course.name">
        <li v-if="course.tag === tag">
          {{ course.name }} <br>
          {{course.ort}} <br>
          {{course.zeit}}
        </li>
      </ul>

</template>

<style scoped>

</style>