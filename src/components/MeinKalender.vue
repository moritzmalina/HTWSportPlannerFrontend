<script setup lang="ts">
import WochenTag from '@/components/WochenTag.vue'
const tage: string[] = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
</script>

<template>
  <div class="container shadow">
  <div class="containerDay" v-for="tag in tage" :key="tag">
    <WochenTag :tag="tag">
    </WochenTag>
  </div>
  </div>
</template>

<style scoped>
.container{
  background-color: whitesmoke;
  margin-top: 5vh;
  border-radius: 10px;
  display: flex;
  gap: 6vw;
}
.containerDay{
  margin-top: 2vh;
}
</style>