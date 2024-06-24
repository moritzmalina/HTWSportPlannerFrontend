<script setup lang="ts">
import { ref, computed } from 'vue';
import { kurse } from "@/scraper/testdata";
import type { Course } from "@/assets/interfaces";

const props = defineProps<{
  tag: string;
}>();

const filteredCourses = computed(() =>
    kurse.value.filter(kurs => kurs.weekDay === props.tag && kurs.selected)
);

const getTimeSlot = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  return (hours - 8) * 50 + (minutes / 60) * 50; // Adjust 50 based on the height of your time slots
};

const markCourse = (kurs: Course) => {
  kurs.marked = !kurs.marked;
};
</script>

<template>
  <h5>{{ tag }}</h5>
  <div class="day-schedule">
    <div
        v-for="kurs in filteredCourses"
        :key="kurs.id"
        :style="{ top: `${getTimeSlot(kurs.courseTime.split('-')[0])}px`, backgroundColor: kurs.marked ? 'red' : 'lightblue' }"
        class="course"
    >
      {{ kurs.courseName }} <br>
      {{ kurs.place }} <br>
      {{ kurs.courseTime }} <br>
      <button @click="markCourse(kurs)">Markieren</button>
    </div>
  </div>
</template>

<style scoped>
.day-schedule {
  position: relative;
  height: 600px; /* Adjust based on your requirements */
  border: 1px solid #ccc;
}

.course {
  position: absolute;
  width: 100%;
  background-color: lightblue;
  border: 1px solid blue;
  border-radius: 5px;
  padding: 5px;
}
</style>
