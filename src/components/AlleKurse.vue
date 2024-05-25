<script setup lang="ts">
import {courses, kurse, loadKurse} from "@/scraper/testdata"
import {extendMyCourses} from "@/scraper/testdata";
</script>

<template>
  <div>
<button @click="loadKurse()"></button>
    <div v-for="kurs in kurse">{{kurs}}</div>
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
          <tr v-for="course in courses" :key="course.name">
            <td>{{ course.name }}</td>
            <td>{{ course.tag }}</td>
            <td>{{ course.zeit }}</td>
            <td></td>
            <td>{{ course.ort }}</td>
            <td>{{ course.leitung }}</td>
            <td><button class="btn btn-info" @click="extendMyCourses(course)" >Hinzufügen</button></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1{
  margin-left: 7vw;
}
</style>