import type { Course } from "@/assets/interfaces";
import { ref } from 'vue';

export const kurse = ref<Course[]>([]);

export function extendMyCourses(myCoursesAdd: Course) {
    const course = kurse.value.find(c => c.name === myCoursesAdd.name);
    if (course) {
        course.selected = true;  // Mark the course as selected
    }
}

export function deleteMyCourses(courseName: string) {
    const course = kurse.value.find(c => c.name === courseName);
    if (course) {
        course.selected = false;  // Unmark the course as selected
    }
}

export function loadKurse() {
//    const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
    const endpoint = 'https://htwsportplanner.onrender.com/entries';
    const requestOptions: any = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch(endpoint, requestOptions)
        .then(res => res.json())
        .then(result => {
            kurse.value = result.map((entry: any) => ({
                name: entry.courseName,
                tag: entry.weekDay,
                ort: entry.place,
                zeit: entry.courseTime,
                datumstart: entry.startDate,
                datumende: entry.endDate,
                leitung: entry.management,
                selected: false  // Initialize as not selected
            } as Course));
            console.log(kurse.value);
        })
        .catch(error => console.log('error', error));
}
