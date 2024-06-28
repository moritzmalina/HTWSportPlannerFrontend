<template>
  <div>
    <div class="buttons">
      <router-link :to="{ name: 'home' }">
        <button class="btn btn-outline-danger me-2">Zurück zu Meine Kurse</button>
      </router-link>
      <button v-if="hasPreviousCourse" class="btn btn-outline-success me-2" @click="goToPreviousCourse">Letzter Kurs</button>
      <button v-else class="btn btn-outline-success me-2" disabled>Letzter Kurs</button>
      <button v-if="hasNextCourse" class="btn btn-outline-success" @click="goToNextCourse">Nächster Kurs</button>
      <button v-else class="btn btn-outline-dark" disabled>Nächster Kurs</button>
    </div>
    <div class="container mt-4">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{{ course?.courseName }}</h5>
          <p class="card-text">
            <strong>Tag:</strong> {{ getFullWeekday(course?.weekDay) }}<br>
            <strong>Zeit:</strong> {{ course?.courseTime }}<br>
            <strong>Zeitraum:</strong> {{ course?.startDate }} - {{ course?.endDate }}<br>
            <strong>Ort:</strong> {{ course?.place }}<br>
            <strong>Leitung:</strong> {{ course?.management }}<br>
            <strong>Beschreibung:</strong> {{ course?.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { kurse } from '@/scraper/testdata';
import type { Course } from "@/assets/interfaces";

const route = useRoute();
const router = useRouter();
const courseName = ref<string>(route.params.name as string);
const course = ref<Course | null>(null);

const myCourses = computed(() => kurse.value.filter(course => course.selected));

onMounted(() => {
  loadCourse();
});

const loadCourse = () => {
  course.value = kurse.value.find(c => c.courseName === courseName.value) || null;
};

watch(() => route.params.name, (newName) => {
  courseName.value = newName as string;
  loadCourse();
});

const getFullWeekday = (shortDay: string | undefined): string => {
  if (!shortDay) return '';
  switch (shortDay) {
    case 'Mo':
      return 'Montag';
    case 'Di':
      return 'Dienstag';
    case 'Mi':
      return 'Mittwoch';
    case 'Do':
      return 'Donnerstag';
    case 'Fr':
      return 'Freitag';
    case 'Sa':
      return 'Samstag';
    case 'So':
      return 'Sonntag';
    default:
      return shortDay; // fallback if no match found
  }
};

const goBack = () => {
  router.push({ name: 'allekurse' });
};

const hasNextCourse = computed(() => {
  if (!course.value) return false;
  const currentIndex = myCourses.value.findIndex(c => c.courseName === course.value?.courseName);
  return currentIndex < myCourses.value.length - 1;
});

const goToNextCourse = () => {
  if (!course.value) return;
  const currentIndex = myCourses.value.findIndex(c => c.courseName === course.value?.courseName);
  const nextIndex = currentIndex + 1;
  router.push({ name: 'detail', params: { name: myCourses.value[nextIndex].courseName } });
};

const hasPreviousCourse = computed(() => {
  if (!course.value) return false;
  const currentIndex = myCourses.value.findIndex(c => c.courseName === course.value?.courseName);
  return currentIndex > 0;
});

const goToPreviousCourse = () => {
  if (!course.value) return;
  const currentIndex = myCourses.value.findIndex(c => c.courseName === course.value?.courseName);
  const previousIndex = currentIndex - 1;
  router.push({ name: 'detail', params: { name: myCourses.value[previousIndex].courseName } });
};
</script>

<style scoped>
h1 {
  margin-left: 5vw;
  font-size: 2rem;
}

.container {
  display: flex;
  justify-content: center;
}

.card {
  width: 30rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.buttons{
  margin-left: 35.5%;
}
.card-title {
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1rem;
}

.card-text {
  font-size: 1.1rem;
  line-height: 1.6;
  padding: 1rem;
}
</style>
