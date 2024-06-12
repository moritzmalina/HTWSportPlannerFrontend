<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { kurse, requestCourses, extendMyCourses } from "@/scraper/testdata";


onMounted(() => {
  requestCourses();
});

const searchQuery = ref('');

// Filter
const filteredCourses = computed(() => {
  return kurse.value.filter(course =>
      course.name.toLowerCase().includes(searchQuery.value.toLowerCase())
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
          <tr v-for="course in filteredCourses" :key="course.name">
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
