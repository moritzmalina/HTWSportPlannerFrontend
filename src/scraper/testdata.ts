import type { Course } from "@/assets/interfaces";
import { ref } from 'vue';
import axios from 'axios';

export const kurse = ref<Course[]>([]);

export function extendMyCourses(myCoursesAdd: Course) {
    const course = kurse.value.find(c => c.id === myCoursesAdd.id);
    if (course) {
        course.selected = true;
        updateCourses(course);
    }
}

export function deleteMyCourses(courseId: string) {
    const course = kurse.value.find(c => c.id === courseId);
    if (course) {
        course.selected = false;
        updateCourses(course);
    }
}

export function requestCourses() {
    axios
        .get<any>('https://htwsportplanner.onrender.com/entries')
        .then((response) => {
            console.log(response.data);


            kurse.value = response.data.map((entry: any) => ({
                id: entry.id,
                courseName: entry.courseName,
                weekDay: entry.weekDay,
                place: entry.place,
                courseTime: entry.courseTime,
                startDate: entry.startDate,
                endDate: entry.endDate,
                management: entry.management,
                selected: entry.selected,
                color: entry.color,
                description: entry.description
            }));
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

export function deleteCourses(courseDelete: Course) {
    axios
        .delete(`https://htwsportplanner.onrender.com/entries/${courseDelete.id}`)
        .then((response) => {
            console.log(`Course with ID ${courseDelete.id} deleted successfully:`, response.data);
            kurse.value = kurse.value.filter(course => course.id !== courseDelete.id);
        })
        .catch((error) => {
            console.error(`Error deleting course with ID ${courseDelete}:`, error);
        });
}
