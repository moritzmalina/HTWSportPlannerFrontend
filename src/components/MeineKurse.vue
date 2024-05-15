<template>
  <div>

    <h1>Meine Kurse</h1>
    <div class="container mt-3">
      <div class="table-responsive">
        <table class="table table-bordered table-hover">
          <thead>
          <tr>
            <th>Kursname</th>
            <th>Zeitpunkt</th>
            <th>Ort</th>
            <th>Kursbeginn</th>
            <th>Kursende</th>
            <th>Verwalten</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="course in courses" :key="course.id">
            <td>{{ course.name }}</td>
            <td>{{ course.time }}</td>
            <td>{{ course.location }}</td>
            <td>{{ course.startDate }}</td>
            <td>{{ course.endDate }}</td>
            <td><button class="btn btn-info">Bearbeiten</button></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      courses: [
        { id: 1, name: 'Badminton', time: 'Freitag, 15:30 - 17:00', location: 'Treskowallee, Halle B', startDate: '01.03.2024', endDate: '01.08.2024' },
        { id: 2, name: 'Kickboxen', time: 'Montag, 17:00 - 18:30', location: 'Sporthalle Nord', startDate: '02.03.2024', endDate: '02.08.2024' },
        { id: 3, name: 'Taek Wan Do', time: 'Mittwoch, 16:00 - 17:30', location: 'Kampfsportzentrum', startDate: '03.03.2024', endDate: '03.08.2024' },
        { id: 4, name: 'Cha Cha', time: 'Donnerstag, 18:00 - 19:00', location: 'Tanzstudio Ost', startDate: '04.03.2024', endDate: '04.08.2024' }
      ]
    };
  }
};
</script>

<style scoped>

</style>
