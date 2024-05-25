import type {Course} from "@/assets/interfaces";
export const kurse : Course []= [];

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
    //const baseUrl = import.meta.env.VUE_APP_BACKEND_BASE_URL;
    const endpoint = 'https://htwsportplanner.onrender.com/entries';
    const requestOptions: any = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch(endpoint, requestOptions)
        .then(res => res.json())
        .then(result => {
            result.forEach((entry:any) => kurse.push(entry));
            console.log(kurse);
        })

        .catch(error => console.log('error', error));
}