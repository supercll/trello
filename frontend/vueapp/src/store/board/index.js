import * as api from '@/api';

export default {
  namespaced: true,

  state: {
    inited: false,
    // 设置为null，方便我们去判断当前是首次获取还是获取到的是一个空数据
    boards: null
  },

  getters: {
    getBoard: ({ boards }) => id =>
      Array.isArray(boards) ? boards.find(board => board.id == id) : null
  },

  mutations: {
    updateBoards: (state, data) => {
      state.boards = data;
      state.inited = true;
    },

    addBoard: (state, data) => {
      if (state.boards === null) {
        state.boards = [];
      }
      state.boards = [...state.boards, data];
    },

    removeBoard: (state, id) => {
      state.boards = state.boards.filter(board => {
        return board.id !== id;
      });
    }
  },

  actions: {
    getPublicBoards: async ({ commit, state }) => {
      try {
        let rs = JSON.parse(localStorage.getItem('publicBoards'));
        if (!rs) {
          rs = await api.getPublicBoards();
          localStorage.setItem('publicBoards', JSON.stringify(rs));
        }
        commit('updateBoards', rs.data);

        return rs;
      } catch (e) {
        throw e;
      }
    },
    getBoards: async ({ commit, state }) => {
      try {
        let rs = JSON.parse(localStorage.getItem('privateBoards'));
        if (!rs) {
          rs = await api.getBoards();
          localStorage.setItem('privateBoards', JSON.stringify(rs));
        }

        commit('updateBoards', rs.data);

        return rs;
      } catch (e) {
        throw e;
      }
    },

    getBoard: async ({ commit }, id) => {
      try {
        let rs = await api.getBoard(id);

        commit('addBoard', rs.data);

        return rs;
      } catch (e) {
        throw e;
      }
    },

    postBoard: async ({ commit }, data) => {
      try {
        let rs = await api.postBoard(data);

        commit('addBoard', rs.data);

        return rs;
      } catch (e) {
        throw e;
      }
    },

    removeBoard: async ({ commit }, id) => {
      try {
        await api.removeBoard(id);
        commit('removeBoard', id);
      } catch (e) {
        throw e;
      }
    }
  }
};
