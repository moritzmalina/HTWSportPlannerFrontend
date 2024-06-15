import type {Course} from "@/assets/interfaces";
import {ref} from 'vue';
import axios from 'axios';

export const kurse = ref<Course[]>([]);

export function extendMyCourses(myCoursesAdd: Course) {
    const course = kurse.value.find(c => c.name === myCoursesAdd.name);
    if (course) {
        course.selected = true;
        //updateCourses(course);
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

            // Extract the IDs of all entries
            const ids = response.data.map((entry: any) => entry.id);

            // Create an array of promises to fetch each entry by ID
            const entryPromises = ids.map((id: number) =>
                axios.get<any>(`https://htwsportplanner.onrender.com/entries/${id}`)
            );

            // Wait for all promises to resolve
            return Promise.all(entryPromises);
        })
        .then((responses) => {
            // Transform each response object into a Course object
            kurse.value = responses.map((response) => {
                const entry = response.data;
                return {
                    id: entry.id,
                    name: entry.courseName,
                    tag: entry.weekDay,
                    ort: entry.place,
                    zeit: entry.courseTime,
                    datumstart: entry.startDate,
                    datumende: entry.endDate,
                    leitung: entry.management,
                    selected: entry.selected
                };
            }); // Assign the array of courses to kurse.value
            console.log(kurse.value);
        })
        .catch((error) => console.log(error));
}

/*
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
 */