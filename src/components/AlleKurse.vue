<script setup lang="ts">
import {courses} from "@/scraper/testdata"
import {extendMyCourses} from "@/scraper/testdata";
</script>

<template>
  <div>

    <h1>Meine Kurse</h1>
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
          <tr v-for="course in courses">
            <td>{{ course.name }}</td>
            <td>{{ course.tag }}</td>
            <td>{{ course.zeit }}</td>
            <td>{{ course.zeitraum }}</td>
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

</style>