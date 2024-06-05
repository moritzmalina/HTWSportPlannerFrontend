<script setup lang="ts">
import {kurse, requestCourses} from "@/scraper/testdata";
import { extendMyCourses } from "@/scraper/testdata";

import { onMounted } from 'vue';
onMounted(() => {
  requestCourses();
});
</script>

<template>
  <div>
    <!-- <button @click="requestCourses()">Load Courses</button> -->
    <h1>Alle Kurse</h1>
    <div class="container mt-3">
      <div class="table-responsive">
        <table class="table table-bordered table-hover">
          <thead>
          <tr>
            <th>Kursname</th>
            <th>Tag</th>
            <th>Zeit</th>
            <th>Zeitraum</th>
            <th>Ort</th>
            <th>Leitung</th>
            <th>Verwalten</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="course in kurse" :key="course.name">
            <td>{{ course.name }}</td>
            <td>{{ course.tag }}</td>
            <td>{{ course.zeit }}</td>
            <td>{{ course.datumstart }} - {{ course.datumende }}</td>
            <td>{{ course.ort }}</td>
            <td>{{ course.leitung }}</td>
            <td>
              <button class="btn btn-info" @click="extendMyCourses(course)">Hinzufügen</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  margin-left: 7vw;
}
</style>
