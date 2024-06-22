<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { kurse, requestCourses, extendMyCourses } from "@/scraper/testdata";

// Fetch courses when the component is mounted
onMounted(() => {
  requestCourses();
});

const searchQuery = ref('');

// Filter courses based on the search query
const filteredCourses = computed(() => {
  return kurse.value.filter(course =>
      course.courseName.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>


<template>
  <div>
    <h1>Alle Kurse</h1>
    <div class="container mt-3">
      <!-- Search input field -->
      <input
          type="text"
          v-model="searchQuery"
          placeholder="Kurs suchen..."
          class="form-control mb-3"
      />
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
          <tr v-for="course in filteredCourses" :key="course.id">
            <td>{{ course.courseName }}</td>
            <td>{{ course.weekDay }}</td>
            <td>{{ course.courseTime }}</td>
            <td>{{ course.startDate }} - {{ course.endDate }}</td>
            <td>{{ course.place }}</td>
            <td>{{ course.management }}</td>
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
