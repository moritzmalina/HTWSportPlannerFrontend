<script setup lang="ts">
import WochenTag from '@/components/WochenTag.vue'
import { kurse } from "@/scraper/testdata";
const tage: string[] = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
</script>

<template>
  <div class="container shadow">
    <div class="time-slots">
      <div v-for="hour in 14" :key="hour" class="time-slot">
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
  background-color: #f4f4f4;
  margin-top: 5vh;
  border-radius: 10px;
  display: flex;
  gap: 6vw;
}

.time-slots {
  margin-top: 8vh;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 1vw;
}

.time-slot {
  height: 50px; /* Adjust based on your requirements */
  display: flex;
  align-items: flex-end; /* Align items to the bottom */
  justify-content: flex-end; /* Align text to the right */
  padding-bottom: 5px; /* Add some padding to the bottom for spacing */
  padding-right: 5px; /* Add some padding to the right for spacing */
}

.containerDay {
  margin: auto;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
