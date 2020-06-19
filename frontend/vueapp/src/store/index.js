import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from './user';
import board from './board';

export default new Vuex.Store({
    state: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        user,
        board
    }
})
