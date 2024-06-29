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

const calculateEndTime = (startTime: string) => {
  const [hours, minutes] = startTime.split(':').map(Number);
  let endHours = hours + 1;
  let endMinutes = minutes + 30;
  if (endMinutes >= 60) {
    endHours += 1;
    endMinutes -= 60;
  }
  return `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
};
</script>

<template>
  <h5>{{ tag }}</h5>
  <div class="day-schedule">
    <div
        v-for="kurs in filteredCourses"
        :key="kurs.id"
        :style="{
        top: `${getTimeSlot(kurs.courseTime.split('-')[0])}px`,
        height: '75px', // 1.5 hours represented as 75px
        backgroundColor: kurs.color ? 'lightgreen' : 'lightblue'
      }"
        class="course"
    >
      <span class="course-name">{{ kurs.courseName }}</span>
    </div>
  </div>
</template>

<style scoped>
.day-schedule {
  position: relative;
  height: 650px; /* Adjusted to fit from 8:00 to 21:00 (13 hours * 50px) */
  border: 1px solid #ccc;
}

.course {
  position: absolute;
  width: 100%;
  border: 1px solid blue;
  border-radius: 5px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
}

.course-name {
  display: inline-block;
  font-size: 10px; /* Default font size */
  white-space: normal; /* Allow text to wrap within the box */
  word-break: break-word; /* Break long words */
}

.course-name:after {
  content: ' ';
  display: block;
  font-size: 10px; /* Adjust this value to see if it works better */
}
</style>
