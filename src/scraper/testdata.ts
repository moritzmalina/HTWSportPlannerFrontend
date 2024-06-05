import type { Course } from "@/assets/interfaces";
import { ref } from 'vue';
import axios from 'axios';

export const kurse = ref<Course[]>([]);

export function extendMyCourses(myCoursesAdd: Course) {
    const course = kurse.value.find(c => c.name === myCoursesAdd.name);
    if (course) {
        course.selected = true;
    }
}

export function deleteMyCourses(courseName: string) {
    const course = kurse.value.find(c => c.name === courseName);
    if (course) {
        course.selected = false;
    }
}

export function loadKurse() {
   const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
    const endpoint = baseURL + '/entries/1';
    const requestOptions: any = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch(endpoint, requestOptions)
        .then(res => res.json())
        .then(result => {
            kurse.value = result.map((entry: any) => ({
                id: entry.id,
                name: entry.courseName,
                tag: entry.weekDay,
                ort: entry.place,
                zeit: entry.courseTime,
                datumstart: entry.startDate,
                datumende: entry.endDate,
                leitung: entry.management,
                selected: false
            } as Course));
            console.log(kurse.value);
        })
        .catch(error => console.log('error', error));
}

export function requestCourses() {
    axios
        .get<any>('https://htwsportplanner.onrender.com/entries/1')
        .then((response) => {
            console.log(response.data); // Log the API response to inspect its structure

            // Transform the single course object into an array containing one Course object
            const courseData = response.data;
            const course: Course = {
                id: courseData.id,
                name: courseData.courseName,
                tag: courseData.weekDay,
                ort: courseData.place,
                zeit: courseData.courseTime,
                datumstart: courseData.startDate,
                datumende: courseData.endDate,
                leitung: courseData.management,
                selected: false
                // Optionally add other properties here
            };
            kurse.value = [course]; // Assign an array containing the course object to kurse.value
            console.log(kurse.value);
        })
        .catch((error) => console.log(error));
}

