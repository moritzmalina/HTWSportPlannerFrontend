import type { Course } from "@/assets/interfaces";
import { ref } from 'vue';
import axios from 'axios';

export const kurse = ref<Course[]>([]);

export function extendMyCourses(myCoursesAdd: Course) {
    const course = kurse.value.find(c => c.courseName === myCoursesAdd.courseName);
    if (course) {
        course.selected = true;
        updateCourses(course);
    }
}

export function deleteMyCourses(courseName: string) {
    const course = kurse.value.find(c => c.courseName === courseName);
    if (course) {
        course.selected = false;
        updateCourses(course);
    }
}

export function requestCourses() {
    axios
        .get<any>('https://htwsportplanner.onrender.com/entries')
        .then((response) => {
            console.log(response.data); // Log the API response to inspect its structure

            // Transform each entry object into a Course object
            kurse.value = response.data.map((entry: any) => ({
                id: entry.id,
                courseName: entry.courseName,
                weekDay: entry.weekDay,
                place: entry.place,
                courseTime: entry.courseTime,
                startDate: entry.startDate,
                endDate: entry.endDate,
                management: entry.management,
                selected: entry.selected
            })); // Assign the array of courses to kurse.value
            console.log(kurse.value);
        })
        .catch((error) => console.log(error));
}

function updateCourses(update: Course): void {
    axios
        .patch<Course>(`https://htwsportplanner.onrender.com/entries/${update.id}`, update)
        .then((response) => {
            console.log(`Course ${update.courseName} updated successfully:`, response.data);
        })
        .catch((error) => {
            console.error(`Error updating course ${update.courseName}:`, error);
        });
}

export function createCourses(create: Course) {
    axios
        .post("https://htwsportplanner.onrender.com/entries", create)
        .then((response) => {
            console.log(`Course ${create.courseName} created successfully:`, response.data);
        })
        .catch((error) => {
            console.error(`Error creating course ${create.courseName}:`, error);
        });
}
