import type {Course} from "@/assets/interfaces";
import { ref } from 'vue';

export const kurse = ref<any[]>([]);

export const courses : Course[] = [
    {
        name: 'Badminton',
        tag: 'Montag',
        ort: 'Treskowallee',
        zeit: '11:30',
        datumstart: '01.01',
        datumende: '02.02',
        leitung: 'Frank'
    },
    {
        name: 'Kickboxen',
        tag: 'Dienstag',
        ort: 'Treskowallee',
        zeit: '14:30',
        datumstart: '01.01',
        datumende: '02.02',
        leitung: 'Tanja'
    },    {
        name: 'Cha Cha',
        tag: 'Mittwoch',
        ort: 'Willhelminenhof',
        zeit: '10:00',
        datumstart: '01.01',
        datumende: '02.02',
        leitung: 'Simone'
    },    {
        name: 'Karate',
        tag: 'Donnerstag',
        ort: 'Treskowallee',
        zeit: '11:30',
        datumstart: '01.01',
        datumende: '02.02',
        leitung: 'Adnan'
    },    {
        name: 'Bouldern',
        tag: 'Montag',
        ort: 'Treskowallee',
        zeit: '11:30',
        datumstart: '01.01',
        datumende: '02.02',
        leitung: 'Dominik'
    },    {
        name: 'Workout',
        tag: 'Freitag',
        ort: 'Willhelminenhof',
        zeit: '16:30',
        datumstart: '01.01',
        datumende: '02.02',
        leitung: 'Edmund'
    }]

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
            kurse.value = result.map((entry: any) => ({
                name: entry.courseName,
                tag: entry.weekDay,
                ort: entry.place,
                zeit: entry.courseTime,
                datumstart: entry.startDate,
                datumende: entry.endDate,
                leitung: entry.management,
            } as Course));
            console.log(kurse.value);
        })
        .catch(error => console.log('error', error));
}
