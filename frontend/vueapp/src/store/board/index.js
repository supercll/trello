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
    putBoard: (state, data) => {
      state.boards = state.boards.map(item => {
        if (item.id === data.id) {
          item = { ...item, ...data };
        }
        return item;
      });
    },

    addBoard: (state, data) => {
      if (state.boards === null) {
        state.boards = [];
      }

      const privateStorage = JSON.parse(localStorage.getItem('privateStorage'));

      if (data.isPrivate === privateStorage) {
        state.boards = [...state.boards, data];
      }
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
        let rs = JSON.parse(localStorage.getItem('publicBoardLocation'));

        if (!rs) {
          rs = await api.getPublicBoards();
          localStorage.setItem('publicBoardLocation', JSON.stringify(rs));
        }

        commit('updateBoards', rs.data);

        return rs;
      } catch (e) {
        throw e;
      }
    },
    getBoards: async ({ commit, state }) => {
      try {
        let rs = JSON.parse(localStorage.getItem('privateBoardLocation'));

        if (!rs) {
          rs = await api.getBoards();
          localStorage.setItem('privateBoardLocation', JSON.stringify(rs));
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

        // commit('addBoard', rs.data);

        return rs;
      } catch (e) {
        throw e;
      }
    },

    postBoard: async ({ commit, state }, data) => {
      try {
        localStorage.setItem('privateBoardLocation', null);
        localStorage.setItem('publicBoardLocation', null);

        const rs = await api.postBoard(data);
        commit('addBoard', rs.data);

        return rs;
      } catch (e) {
        throw e;
      }
    },
    putBoard: async ({ commit, state }, data) => {
      try {
        localStorage.setItem('privateBoardLocation', null);
        localStorage.setItem('publicBoardLocation', null);
        const rs = await api.putBoard(data);

        commit('putBoard', data);

        return rs;
      } catch (e) {
        throw e;
      }
    },

    removeBoard: async ({ commit }, id) => {
      try {
        localStorage.setItem('privateBoardLocation', null);
        localStorage.setItem('publicBoardLocation', null);
        await api.removeBoard(id);
        commit('removeBoard', id);
      } catch (e) {
        throw e;
      }
    }
  }
};
