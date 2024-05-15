<!-- AlleKurse.vue -->
<template>
  <div>
    <h1>Alle Kurse</h1>
    <ul>
      <li v-for="(quote, index) in quotes" :key="index">
        <div>
          <strong>{{ quote.titel }}</strong>
          <p>Tag: {{ quote.tag }}</p>
          <p>Ort: {{ quote.ort }}</p>
          <p>Zeit: {{ quote.zeit }}</p>
          <p>Zeitraum: {{ quote.zeitraum }}</p>
          <p>Leitung: {{ quote.leitung }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      quotes: []
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:5173/allekurse'); // Ensure this endpoint is correct
        console.log(response.data); // Log to verify data is being fetched
        this.quotes = response.data;
      } catch (error) {
        console.error('Error fetching quotes:', error);
      }
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
