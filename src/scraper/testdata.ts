import type {Course} from "@/assets/interfaces";
import { ref } from 'vue';

export const courses = ref<any[]>([]);



export const myCourses: Course[] = [];

export function extendMyCourses(myCoursesAdd : Course){
    myCourses.push(myCoursesAdd);
}

export function deleteMyCourses(courseName: string) {
    const index = myCourses.findIndex(course => course.name === courseName);
    if (index !== -1) {
        myCourses.splice(index, 1);
    }
}



export function loadKurse() {
    const endpoint = 'https://htwsportplanner.onrender.com/entries';
    const requestOptions: any = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch(endpoint, requestOptions)
        .then(res => res.json())
        .then(result => {
            courses.value = result.map((entry: any) => ({
                name: entry.courseName,
                tag: entry.weekDay,
                ort: entry.place,
                zeit: entry.courseTime,
                datumstart: entry.startDate,
                datumende: entry.endDate,
                leitung: entry.management,
            } as Course));
            console.log(courses.value);
        })
        .catch(error => console.log('error', error));
}
