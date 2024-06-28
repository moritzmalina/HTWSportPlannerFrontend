<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const isActive = (path: string) => {
  return route.path === path
}
</script>

<template>
  <br/>
  <header class="navbar navbar-expand-lg">
    <div class="container-fluid d-flex justify-content-between align-items-center">
      <RouterLink to="/" class="navbar-brand">
        <img src="@/assets/images/Q04_HTW_Berlin_Logo_quer_pos_FARBIG_RGB.jpg" alt="HTW Berlin Logo" width="200" height="auto">
      </RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav justify-content-center">
          <li class="nav-item nav-item-first">
            <RouterLink to="/" class="nav-link btn btn-outline-light me-2" :class="{ active: isActive('/') }">Meine Kurse</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/allekurse" class="nav-link btn btn-outline-light me-2" :class="{ active: isActive('/allekurse') }">Alle Kurse</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/kalender" class="nav-link btn btn-outline-light" :class="{ active: isActive('/kalender') }">Kalender</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </header>
  <body>
  <RouterView />
  </body>
</template>



<style scoped>
.navbar {
  border-radius: 15px;
  background-color: white;
}

.navbar-brand img {
  max-height: 70px;
}

.nav-link {
  color: black; /* Text Farbe nicht ausgewählt */
  margin-right: 8px;
  text-align: center;
}

.nav-link.active, .nav-link:hover {
  background-color: #76B900; /* HTW Berlin Green */
  color: white; /* Text Farbe ausgewählt */
  border-color: #76B900;
}
.nav-item-first{
  margin-left: 25vw;
}
</style>
