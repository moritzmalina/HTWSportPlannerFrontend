<template>
  <div>
    <h1>Meine Kurse</h1>
    <div class="container mt-3">
      <div class="table-responsive">
        <table class="table table-bordered table-hover">
          <thead>
          <tr>
            <th>Kursname</th>
            <th>Leitung</th>
            <th>Zeitpunkt</th>
            <th>Ort</th>
            <th>Kursbeginn</th>
            <th>Kursende</th>
            <th>Tag</th>
            <th>Verwalten</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="course in myCourses" :key="course.name">
            <td>{{ course.name }}</td>
            <td>{{ course.tag }}</td>
            <td>{{ course.zeit }}</td>
            <td>{{ course.ort }}</td>
            <td>{{ course.datumstart }}</td>
            <td>{{ course.datumende }}</td>
            <td>{{ course.leitung }}</td>
            <td>
              <button class="btn btn-danger" @click="removeCourse(course.name)">Entfernen</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { deleteMyCourses, kurse } from '@/scraper/testdata';

export default defineComponent({
  name: 'Kurse',
  setup() {
    const myCourses = computed(() => kurse.value.filter(course => course.selected));

    const removeCourse = (courseName: string) => {
      deleteMyCourses(courseName);
      // This removes the selected flag
      const course = kurse.value.find(course => course.name === courseName);
      if (course) {
        course.selected = false;
      }
    };

    return {
      myCourses,
      removeCourse
    };
  }
});
</script>

<style scoped>
h1 {
  margin-left: 7vw;
}
</style>
