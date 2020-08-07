import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from './user';
import board from './board';
import list from './list';
import card from './card';
import comment from './comment';

export default new Vuex.Store({
    state: {
        server: {
            staticPath: process.env.VUE_APP_SERVER_STATIC_PATH
        }
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        user,
        board,
        list,
        card,
        comment
    }
})
