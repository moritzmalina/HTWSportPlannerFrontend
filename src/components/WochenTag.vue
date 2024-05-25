<script setup lang="ts">
const props = defineProps({
  tag: String})
</script>

<template>
      <h5>{{ tag }}</h5>

</template>

<style scoped>
/*
    <ul v-for="course in myCourses" :key="course.name">
        <li v-if="course.tag === tag">
          {{ course.name }} <br>
          {{course.ort}} <br>
          {{course.zeit}}
        </li>
      </ul>
*/

</style>