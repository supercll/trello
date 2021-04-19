import { register, login, getTotalCard } from '@/api';

export default {
  namespaced: true,
  state: {
    info: null,
    totalCard: null
  },
  mutations: {
    initUserInfo: state => {
      try {
        let data = JSON.parse(localStorage.getItem('user'));
        state.info = data;
      } catch (e) {}
    },
    updateUserInfo: (state, data) => {
      state.info = data;

      localStorage.setItem('user', JSON.stringify(data));
    },
    removeUserInfo: (state, data) => {
      state.info = null;
      localStorage.removeItem('user');
    },
    getTotalCard: (state, data) => {
      state.totalCard = data;
    }
  },
  actions: {
    register: ({}, data) => {
      return register(data);
    },

    login: async ({ commit }, data) => {
      try {
        let rs = await login(data);

        commit('updateUserInfo', {
          id: rs.data.id,
          name: rs.data.name,
          authorization: rs.headers.authorization
        });

        return rs;
      } catch (e) {
        throw e;
      }
    },

    logout: async ({ commit }) => {
      commit('removeUserInfo');
    },

    getTotalCard: async ({ commit }) => {
      try {
        const res = await getTotalCard();
        commit('getTotalCard', res.data);
        return res;
      } catch (err) {}
    }
  }
};
