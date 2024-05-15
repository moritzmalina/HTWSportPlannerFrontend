import type {Course} from "@/assets/interfaces";

export const courses : Course[] = [
    {
        name: 'Badminton',
        tag: 'Montag',
        ort: 'Treskowallee',
        zeit: '11:30',
        zeitraum: '11:30 - 15:00',
        leitung: 'Frank'
    },
    {
        name: 'Kickboxen',
        tag: 'Dienstag',
        ort: 'Treskowallee',
        zeit: '14:30',
        zeitraum: '11:30 - 15:00',
        leitung: 'Tanja'
    },    {
        name: 'Cha Cha',
        tag: 'Mittwoch',
        ort: 'Willhelminenhof',
        zeit: '10:00',
        zeitraum: '11:30 - 15:00',
        leitung: 'Simone'
    },    {
        name: 'Karate',
        tag: 'Donnerstag',
        ort: 'Treskowallee',
        zeit: '11:30',
        zeitraum: '11:30 - 15:00',
        leitung: 'Adnan'
    },    {
        name: 'Bouldern',
        tag: 'Montag',
        ort: 'Treskowallee',
        zeit: '11:30',
        zeitraum: '10:30 - 15:00',
        leitung: 'Dominik'
    },    {
        name: 'Workout',
        tag: 'Freitag',
        ort: 'Willhelminenhof',
        zeit: '16:30',
        zeitraum: '11:30 - 15:00',
        leitung: 'Edmund'
    }]

export let myCourses: Course[] = [];

export function extendMyCourses(myCoursesAdd : Course){
    myCourses.push(myCoursesAdd);
}

export function deleteMyCourses(courseName: string) {
    const index = myCourses.findIndex(course => course.name === courseName);
    if (index !== -1) {
        myCourses.splice(index, 1);
    }
}