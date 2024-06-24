import { ref } from 'vue';
import { extendMyCourses, deleteMyCourses, kurse, requestCourses, createCourses, deleteCourses } from '@/path/to/your/module';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {Course} from "../../assets/interfaces";

const mock = new MockAdapter(axios);

describe('Courses Module', () => {
    afterEach(() => {
        mock.reset();
    });

    it('should extend a course and mark it as selected', () => {
        const course: Course = { id: '1', courseName: 'Test Course', weekDay: '', place: '', courseTime: '', startDate: '', endDate: '', management: '', selected: false, color: true, description: '' };
        kurse.value = [course];

        extendMyCourses(course);
        expect(kurse.value[0].selected).toBe(true);
    });

    it('should delete a course and mark it as not selected', () => {
        const course: Course = { id: '1', courseName: 'Test Course', weekDay: '', place: '', courseTime: '', startDate: '', endDate: '', management: '', selected: true, color: true, description: '' };
        kurse.value = [course];

        deleteMyCourses(course.courseName);
        expect(kurse.value[0].selected).toBe(false);
    });

    it('should fetch courses and populate kurse', async () => {
        const courses = [
            { id: '1', courseName: 'Course 1', weekDay: 'Monday', place: 'Place 1', courseTime: '10:00-11:00', startDate: '2022-01-01', endDate: '2022-01-31', management: 'Manager 1', selected: false, color: true, description: 'Description 1' },
        ];
        mock.onGet('https://htwsportplanner.onrender.com/entries').reply(200, courses);

        await requestCourses();
        expect(kurse.value).toEqual(courses);
    });

    // Add more tests as needed
});
