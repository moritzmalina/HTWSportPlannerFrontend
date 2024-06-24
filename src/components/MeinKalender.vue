<script setup lang="ts">
import WochenTag from '@/components/WochenTag.vue'
import { kurse } from "@/scraper/testdata"; // Ensure the correct import path

const tage: string[] = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
</script>

<template>
  <div class="container shadow">
    <div class="time-slots">
      <div v-for="hour in 12" :key="hour" class="time-slot">
        {{ 8 + hour }}:00
      </div>
    </div>
    <div class="containerDay" v-for="tag in tage" :key="tag">
      <WochenTag :tag="tag" :kurse="kurse" />
    </div>
  </div>
</template>

<style scoped>
.container {
  background-color: whitesmoke;
  margin-top: 5vh;
  border-radius: 10px;
  display: flex;
  gap: 6vw;
}

.time-slots {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 1vw;
}

.time-slot {
  height: 50px; /* Adjust based on your requirements */
  display: flex;
  align-items: center;
}

.containerDay {
  margin: auto;
  margin-top: 2vh;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 10px; /* Adjust the gap as needed */
}
</style>
