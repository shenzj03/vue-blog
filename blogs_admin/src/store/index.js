import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
    state: () => {
        const userInof = {}
        return {
            userInof,
        }
    },
    getters: {

    },
    actions: {

    },
    persist: {
        paths: ['userInof'],
        Storage: localStorage
    }
})