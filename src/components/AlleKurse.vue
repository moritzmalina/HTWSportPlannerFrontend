<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { kurse, requestCourses, extendMyCourses, deleteCourses } from "@/scraper/testdata";

onMounted(() => {
  requestCourses();
});

const searchQuery = ref('');


const filteredCourses = computed(() => {
  return kurse.value.filter(course =>
    course.courseName.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<template>
  <br/>
  <div>
    <div class="head-titel">
      <h1>Alle Kurse</h1>
    </div>
    <div class="container mt-3">
      <!-- Search input field -->
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Kurs suchen..."
        class="form-control mb-3"
      />
      <div class="table-responsive">
        <table class="table table-bordered">
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
          <tr v-for="course in filteredCourses" :key="course.id">
            <td>{{ course.courseName }}</td>
            <td>{{ course.weekDay }}</td>
            <td>{{ course.courseTime }}</td>
            <td>{{ course.startDate }} - {{ course.endDate }}</td>
            <td>{{ course.place }}</td>
            <td>{{ course.management }}</td>
            <td class="flex-td">
              <button class="btn btn btn-outline-success me-2" @click="extendMyCourses(course)">Hinzufügen</button>
              <button class="btn btn-outline-danger" @click="deleteCourses(course)">Löschen</button>
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

.flex-td {
  display: flex;
  justify-content: space-between;
}
.head-titel {
  margin-left: 1%;
}
</style>
