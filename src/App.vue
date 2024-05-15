<script setup lang="ts">
</script>

<template>
  <header>
    <div>
      <img src="@/assets/images/Q04_HTW_Berlin_Logo_quer_pos_FARBIG_RGB.jpg" alt="HTW Berlin Logo" width="300" height="70">
    </div>
    <nav>
      <button class="btn btn-outline-primary" style="margin-right: 8px;"><RouterLink to="/">Home</RouterLink></button>
      <button class="btn btn-outline-primary" style="margin-right: 8px;"><RouterLink to="/allekurse">Alle Kurse</RouterLink></button>
      <button class="btn btn-outline-primary"><RouterLink to="/kalender">Kalender</RouterLink></button>
    </nav>
  </header>
  <body>

  <RouterView />
  </body>
</template>


<style scoped>
nav{
  text-align: left;
  width: 50%;
}

</style>
