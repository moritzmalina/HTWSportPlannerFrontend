<template>
  <br/>
  <div>
    <div class="head-titel">
      <h1 class="ms-5 text">Meine Kurse</h1>
      <div class="buttons-container">
        <button v-if="showAddCourseForm" class="btn btn-outline-success btn-add" @click="addCourse">Hinzufügen</button>
        <button class="btn btn-outline-primary btn-new" @click="toggleAddCourseForm">Neuen Kurs hinzufügen</button>
      </div>
    </div>
    <!-- Formular zum Hinzufügen eines neuen Kurses -->
    <div v-if="showAddCourseForm" class="container mt-3">
      <div class="table-responsive">
        <table class="table table-bordered">
          <thead>
          <tr>
            <th>Kursname</th>
            <th>Tag</th>
            <th>Zeitpunkt</th>
            <th>Ort</th>
            <th>Kursbeginn</th>
            <th>Kursende</th>
            <th>Leitung</th>
            <th>Beschreibung</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td><input class="form-control" type="text" v-model="creationName" /></td>
            <td>
              <select class="form-select" v-model="creationDay">
                <option value="Mo">Montag</option>
                <option value="Di">Dienstag</option>
                <option value="Mi">Mittwoch</option>
                <option value="Do">Donnerstag</option>
                <option value="Fr">Freitag</option>
                <option value="Sa">Samstag</option>
                <option value="So">Sonntag</option>
              </select>
            </td>
            <td><input class="form-control" type="time" v-model="creationTime" /></td>
            <td><input class="form-control" type="text" v-model="creationPlace" /></td>
            <td><input class="form-control" type="date" v-model="creationBegin" /></td>
            <td><input class="form-control" type="date" v-model="creationEnd" /></td>
            <td><input class="form-control" type="text" v-model="creationManagement" /></td>
            <td><input class="form-control" type="text" v-model="creationDescription" /></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Tabelle für bestehende Kurse -->
    <div class="container mt-3">
      <div class="table-responsive">
        <table class="table table-bordered">
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
          <tr v-for="course in myCourses" :key="course.id">
            <td>{{ course.courseName }}</td>
            <td>{{ course.weekDay }}</td>
            <td>{{ course.courseTime }}</td>
            <td>{{ course.place }}</td>
            <td>{{ course.startDate }}</td>
            <td>{{ course.endDate }}</td>
            <td>{{ course.management }}</td>
            <td class="flex-td">
              <router-link :to="{ name: 'detail', params: { name: course.courseName } }">
                <button class="btn btn-outline-primary me-2">Detail</button>
              </router-link>
              <button class="btn btn-outline-danger" @click="removeCourse(course.id)">Entfernen</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, computed, onMounted} from 'vue';
import { deleteMyCourses, createCourses, kurse, requestCourses } from '@/scraper/testdata';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Kurse',
  setup() {
    const router = useRouter();
    const myCourses = computed(() => kurse.value.filter(course => course.selected));

    const creationName = ref('');
    const creationDay = ref('');
    const creationTime = ref('');
    const creationPlace = ref('');
    const creationBegin = ref('');
    const creationEnd = ref('');
    const creationManagement = ref('');
    const creationDescription = ref('');

    const showAddCourseForm = ref(false);

    onMounted(() => {
      requestCourses();
    });

    const removeCourse = (courseId: string) => {
      deleteMyCourses(courseId);
      const course = kurse.value.find(course => course.id === courseId);
      if (course) {
        course.selected = false;
      }
    };

    const addCourse = () => {
      const newCourse = {
        id: '',
        courseName: creationName.value,
        management: creationManagement.value,
        place: creationPlace.value,
        weekDay: creationDay.value,
        courseTime: creationTime.value,
        startDate: creationBegin.value,
        endDate: creationEnd.value,
        selected: true,
        color: true,
        description: creationDescription.value
      };

      createCourses(newCourse);

      // Reset input fields
      resetFormFields();


      showAddCourseForm.value = false;
    };

    const toggleAddCourseForm = () => {
      resetFormFields();
      showAddCourseForm.value = !showAddCourseForm.value;
    };

    const resetFormFields = () => {
      creationName.value = '';
      creationDay.value = '';
      creationTime.value = '';
      creationPlace.value = '';
      creationBegin.value = '';
      creationEnd.value = '';
      creationManagement.value = '';
      creationDescription.value = '';
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
      creationDescription,
      addCourse,
      toggleAddCourseForm,
      showAddCourseForm
    };
  }
});
</script>

<style scoped>
.head-titel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 5%;
}

.buttons-container {
  display: flex;
  margin-right: 8.5%;
}

.btn-add {
  margin-left: 10px;
}

.btn-new {
  margin-left: 10px;
}

.flex-td {
  display: flex;
  justify-content: space-between;
}

.table td {
  padding: 10px;
}
</style>
