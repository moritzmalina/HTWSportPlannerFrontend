<template>
  <div>
    <h1>Meine Kurse</h1>
    <div class="container mt-3">
      <div class="table-responsive">
        <table class="table table-bordered table-hover">
          <thead>
          <tr>
            <th>Kursname</th>
            <th>Zeitpunkt</th>
            <th>Ort</th>
            <th>Kursbeginn</th>
            <th>Kursende</th>
            <th>Verwalten</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="course in myCourses" :key="course.id">
            <td>{{ course.name }}</td>
            <td>{{ course.tag }}</td>
            <td>{{ course.zeit }}</td>
            <td>{{ course.zeitraum }}</td>
            <td>{{ course.ort }}</td>
            <td>{{ course.leitung }}</td>
            <td><button class="btn btn-info">Bearbeiten</button></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { myCourses } from '@/scraper/testdata';

export default defineComponent({
  name: 'Kurse',
  data() {
    return {
      myCourses
    };
  }
});
</script>

<style scoped>

</style>
