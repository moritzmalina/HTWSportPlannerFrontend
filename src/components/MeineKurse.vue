<template>
  <div>
    <h1>Meine Kurse</h1>
    <div class="container mt-3">
      <div class="table-responsive">
        <table class="table table-bordered table-hover">
          <thead>
          <tr>
            <th>Kursname</th>
            <th>Tag</th>
            <th>Zeitpunkt</th>
            <th>Ort</th>
            <th>Kursbeginn</th>
            <th>Kursende</th>
            <th>Leitung</th>
            <th>Verwalten</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="course in myCourses" :key="course.courseName">
            <td>{{ course.courseName }}</td>
            <td>{{ course.weekDay }}</td>
            <td>{{ course.courseTime }}</td>
            <td>{{ course.place }}</td>
            <td>{{ course.startDate }}</td>
            <td>{{ course.endDate }}</td>
            <td>{{ course.management }}</td>
            <td>
              <router-link :to="{ name: 'detail', params: { name: course.courseName } }"><button class ="btn btn-info me-2"> Detail </button></router-link>
              <button class="btn btn-danger" @click="removeCourse(course.courseName)">Entfernen</button>
            </td>
          </tr>
          </tbody>
        </table>
        <h2>Kurs hinzufügen</h2>
        <div class="container mt-3">
          <div class="table-responsive">
            <table class="table table-bordered table-hover">
            <thead>
            <tr>
              <th>Kursname</th>
              <th>Tag</th>
              <th>Zeitpunkt</th>
              <th>Ort</th>
              <th>Kursbeginn</th>
              <th>Kursende</th>
              <th>Leitung</th>
            </tr>
           </thead>
          <tbody>
            <tr>
              <td> <input type="text" v-model="creationName" /> </td>
              <td> <input type="text" v-model="creationDay" /> </td>
              <td> <input type="time" v-model="creationTime" /> </td>
              <td> <input type="text" v-model="creationPlace" /> </td>
              <td> <input type="date" v-model="creationBegin" /> </td>
              <td> <input type="date" v-model="creationEnd" /> </td>
              <td> <input type="text" v-model="creationManagement" /> </td>
                </tr>
              </tbody>
            </table>
            <button @click="addCourse"> Hinzufügen </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { deleteMyCourses, kurse, createCourses } from '@/scraper/testdata';
import type { Course } from "@/assets/interfaces";

export default defineComponent({
  name: 'Kurse',
  setup() {
    const myCourses = computed(() => kurse.value.filter(course => course.selected));

    // Define reactive properties for the form inputs
    const creationName = ref('');
    const creationDay = ref('');
    const creationTime = ref('');
    const creationPlace = ref('');
    const creationBegin = ref('');
    const creationEnd = ref('');
    const creationManagement = ref('');

    const removeCourse = (courseName: string) => {
      deleteMyCourses(courseName);

      const course = kurse.value.find(course => course.courseName === courseName);
      if (course) {
        course.selected = false;
      }
    };

    const addCourse = () => {
      const newCourse = {
        id: '', // ID will be assigned by the backend
        courseName: creationName.value,
        management: creationManagement.value,
        place: creationPlace.value,
        weekDay: creationDay.value,
        courseTime: creationTime.value,
        startDate: creationBegin.value,
        endDate: creationEnd.value,
        selected: true
      };

      createCourses(newCourse);

      // Reset input fields
      creationName.value = '';
      creationDay.value = '';
      creationTime.value = '';
      creationPlace.value = '';
      creationBegin.value = '';
      creationEnd.value = '';
      creationManagement.value = '';
    };

    return {
      myCourses,
      removeCourse,
      creationName,
      creationDay,
      creationTime,
      creationPlace,
      creationBegin,
      creationEnd,
      creationManagement,
      addCourse
    };
  }
});
</script>

<style scoped>
h1 {
  margin-left: 7vw;
}
</style>
