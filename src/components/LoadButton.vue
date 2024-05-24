<script setup lang="ts">



import {loadKurse} from "@/scraper/testdata";
import {kurse} from "@/scraper/testdata";
</script>

<template>
  <button @click="loadKurse">Load Kurse</button>
  <p> {{ kurse }} </p>
</template>

<style scoped>
/* Dein CSS */
</style>
