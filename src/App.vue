<script setup lang="ts">
</script>

<template>
  <header>
    <div>
      <img src="@/assets/images/Q04_HTW_Berlin_Logo_quer_pos_FARBIG_RGB.jpg" alt="HTW Berlin Logo" width="300" height="70">
    </div>
    <nav>
      <RouterLink to="/"><button class=" shadow-sm btn btn-outline-primary" style="margin-right: 8px;">Meine Kurse</button></RouterLink>
      <RouterLink to="/allekurse"><button class="shadow-sm btn btn-outline-primary" style="margin-right: 8px;">Alle Kurse</button></RouterLink>
      <RouterLink to="/kalender"><button class="shadow-sm btn btn-outline-primary">Kalender</button></RouterLink>

    </nav>
  </header>
  <body>

  <RouterView />
  </body>
</template>


<style scoped>
nav{
  margin-left: 35%;
  text-align: center;
  width: 25%;
}

</style>
