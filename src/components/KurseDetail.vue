<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { kurse } from '@/scraper/testdata';
import type { Course } from "@/assets/interfaces";

const route = useRoute();
const courseName = ref<string>(route.params.name as string);
const course = ref<Course | null>(null);

const loadCourse = () => {
  course.value = kurse.value.find(c => c.name === courseName.value) || null;
};

onMounted(loadCourse);

// Watch for route changes
watch(() => route.params.name, (newName) => {
  courseName.value = newName as string;
  loadCourse();
});
</script>

<template>
  <div>
    <h1>{{ course?.name }}</h1>
    <div class="container mt-3">
      <div v-if="course">
        <p><strong>Tag:</strong> {{ course.tag }}</p>
        <p><strong>Zeit:</strong> {{ course.zeit }}</p>
        <p><strong>Zeitraum:</strong> {{ course.datumstart }} - {{ course.datumende }}</p>
        <p><strong>Ort:</strong> {{ course.ort }}</p>
        <p><strong>Leitung:</strong> {{ course.leitung }}</p>
      </div>
      <div v-else>
        <p>Kursdetails nicht gefunden.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  margin-left: 7vw;
}
</style>
