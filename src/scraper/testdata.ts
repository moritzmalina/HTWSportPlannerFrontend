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
        .get<any>('https://htwsportplanner.onrender.com/entries')
        .then((response) => {
            console.log(response.data); // Log the API response to inspect its structure

            // Transform each entry object into a Course object
            const courses: Course[] = response.data.map((entry: any) => ({
                id: entry.id,
                name: entry.courseName,
                tag: entry.weekDay,
                ort: entry.place,
                zeit: entry.courseTime,
                datumstart: entry.startDate,
                datumende: entry.endDate,
                leitung: entry.management,
                selected: false
            }));

            kurse.value = courses; // Assign the array of courses to kurse.value
            console.log(kurse.value);
        })
        .catch((error) => console.log(error));
}

