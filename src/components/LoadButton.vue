<script setup lang="ts">

const kurse : string []= [];

function loadKurse() {
  const baseUrl = process.env.VUE_APP_BACKEND_BASE_URL;
  const endpoint = `${baseUrl}/entries`;
  console.log('Fetching from:', endpoint);
  const requestOptions: any = {
    method: 'GET',
    redirect: 'follow'
  };
  fetch(endpoint, requestOptions)
    .then(res => res.json())
    .then(result => {
      result.forEach((entry:any) => kurse.push(entry));
    })
    .catch(error => console.log('error', error));
}
</script>

<template>
  <button @click="loadKurse">Load Kurse</button>
</template>

<style scoped>
/* Dein CSS */
</style>
