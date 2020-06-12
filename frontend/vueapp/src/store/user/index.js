import {register} from '@/api'

export default {
    namespaced: true,
    state: {

    },
    mutations: {

    },
    actions: {
        register: async ({}, data) => {
            return register(data);
        }
    }
}