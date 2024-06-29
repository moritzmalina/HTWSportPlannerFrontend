import { describe, it, expect, vi } from 'vitest'
import { shallowMount, flushPromises } from '@vue/test-utils'
import AlleKurse from "@/components/AlleKurse.vue"


describe('AlleKurse', () => {
    vi.mock('axios')
    vi.mock('@/scraper/testdata')

    it('should render the title "Alle Kurse"', () => {
        const wrapper = shallowMount(AlleKurse)
        expect(wrapper.text()).toMatch('Alle Kurse')
    })

    it('should render the search input field', () => {
        const wrapper = shallowMount(AlleKurse)
        const searchInput = wrapper.find('input[type="text"]')
        expect(searchInput.exists()).toBe(true)
        expect(searchInput.attributes('placeholder')).toBe('Kurs suchen...')
    })
})
