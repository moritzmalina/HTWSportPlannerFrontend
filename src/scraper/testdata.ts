import type { Course } from "@/assets/interfaces";
import { ref } from 'vue';
import axios from 'axios';

export const kurse = ref<Course[]>([]);

export function extendMyCourses(myCoursesAdd: Course) {
    const course = kurse.value.find(c => c.name === myCoursesAdd.name);
    if (course) {
        course.selected = true;
        updateCourses(course);
    }
}

export function deleteMyCourses(courseName: string) {
    const course = kurse.value.find(c => c.name === courseName);
    if (course) {
        course.selected = false;
    }
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
                selected: entry.selected
            }));

            kurse.value = courses; // Assign the array of courses to kurse.value
            console.log(kurse.value);
        })
        .catch((error) => console.log(error));
}

function updateCourses(update: Course): void {
    axios
        .patch<Course>(`https://htwsportplanner.onrender.com/entries/${update.id}`, update)
        .then((response) => {
            console.log(`Course ${update.name} updated successfully:`, response.data);
        })
        .catch((error) => {
            console.error(`Error updating course ${update.name}:`, error);
        });
}