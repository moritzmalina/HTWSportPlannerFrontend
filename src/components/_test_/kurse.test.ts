import { describe, it, expect, vi } from 'vitest'
import { shallowMount, flushPromises } from '@vue/test-utils'
import MeineKurse from "@/components/MeineKurse.vue";
import axios from 'axios'

describe('MeineKurse', () => {
    const emptyResponse: any[] = []
    const twoItemResponse: any[] = [
        {
            id: '1',
            courseName: 'Yoga',
            weekDay: 'Mo',
            courseTime: '10:00',
            place: 'Test 1',
            startDate: '2024-01-01',
            endDate: '2024-06-01',
            management: 'Lord Voldemort',
            selected: true,
            color: true,
            description: 'Test 1'
        },
        {
            id: '2',
            courseName: 'Pilates',
            weekDay: 'Di',
            courseTime: '11:00',
            place: 'Test 2',
            startDate: '2024-01-02',
            endDate: '2024-06-02',
            management: 'Harry Potter',
            selected: true,
            color: true,
            description: 'Test 2'
        }
    ]

    vi.mock('axios')
    vi.mock('@okta/okta-vue')




    it('should render the title "Meine Kurse"', () => {
        vi.mocked(axios, true).get.mockResolvedValueOnce({ data: emptyResponse })

        const wrapper = shallowMount(MeineKurse)
        expect(wrapper.text()).toMatch('Meine Kursee')
    })




    it('should render the header "Kurse hinzufügen"', () => {
        vi.mocked(axios, true).get.mockResolvedValueOnce({ data: emptyResponse })

        const wrapper = shallowMount(MeineKurse)
        expect(wrapper.text()).toMatch('Kurs hinzufügen')
    })

    it('should render the label "Kursname"', () => {
        vi.mocked(axios, true).get.mockResolvedValueOnce({ data: emptyResponse })
        const wrapper = shallowMount(MeineKurse)
        expect(wrapper.text()).toContain('Kursname')
    })
})
