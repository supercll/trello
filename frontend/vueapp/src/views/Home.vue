<template>
  <div id="home">
    <!--头部-->
    <t-header></t-header>

    <main>
      <h2>
        <span class="icon icon-board"></span>
        看板列表
        <button @click="onTogglePermission">
          {{ private ? '显示公共面板' : '只显示私有面板' }}
        </button>
      </h2>
      <ul class="board-items">
        <router-link
          tag="li"
          v-for="board of boards"
          :key="board.id"
          class="board-item"
          :class="{ myBorad: userName == board.userName }"
          :to="{ name: 'Board', params: { id: board.id } }"
        >
          <TListMenu class="bord-menu">
            <li class="list-button list-remove" @click.prevent="removeBorad(board.id)">删除</li>
          </TListMenu>
          <span v-if="userName == board.userName" class="belongTo">自己的看板</span>
          <span v-else class="belongTo">
            <strong>{{ board.userName }}</strong>
            的看板
          </span>
          <span class="title">{{ board.name }}</span>
          <!-- <div class="remove-board" @click.prevent="removeBorad(board.id)">x</div> -->
        </router-link>

        <li class="board-item create-new-board">
          <textarea
            class="title form-field-input"
            placeholder="创建新看板"
            ref="newBoardName"
            @blur="postBoard"
            @keydown.enter.prevent="postBoard"
          ></textarea>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import THeader from '@/components/THeader';
import TListMenu from '@/components/TListMenu';
import { mapState } from 'vuex';

export default {
  name: 'Home',

  data() {
    return {
      isMoreShow: false,
      userName: null,
      private: false
    };
  },

  components: {
    THeader,
    TListMenu
  },

  computed: {
    ...mapState('board', {
      boards: state => state.boards,
      inited: state => state.inited
    })
  },

  created() {
    const privateStorage = localStorage.getItem('privateStorage');
    this.private = privateStorage;
    if (!this.inited && !privateStorage) {
      this.$store.dispatch('board/getPublicBoards');
    } else if (!this.inited && privateStorage) {
      this.$store.dispatch('board/getBoards');
    }
    const userName = JSON.parse(localStorage.getItem('user')).name;
    this.userName = userName;
  },

  methods: {
    async postBoard() {
      let val = this.$refs.newBoardName.value;
      const userName = JSON.parse(localStorage.getItem('user')).name;
      if (val.trim() !== '') {
        try {
          await this.$store.dispatch('board/postBoard', {
            name: val,
            userName
          });

          this.$message.success('面板创建成功');
        } catch (e) {}
      }
      this.$refs.newBoardName.value = '';
    },

    async removeBorad(id) {
      try {
        await this.$store.dispatch('board/removeBoard', id);
        this.$message.success('面板删除成功');
      } catch (e) {}
    },
    onTogglePermission() {
      const change = !this.private;
      change
        ? this.$store.dispatch('board/getBoards')
        : this.$store.dispatch('board/getPublicBoards');
      localStorage.setItem('privateStorage', change);
      this.private = change;
    }
  }
};
</script>

<style lang="scss">
.bord-menu {
  position: absolute;
  right: 0;
  top: 0;
}
.belongTo {
  position: absolute;
  top: 0px;
  left: 3px;
  color: white;
  font-size: 12px;
}

.myBorad {
  background: $bili_blue !important;
}

#home {
  main {
    margin: 10px;
    flex-grow: 1;
    h2 {
      height: 32px;
      line-height: 32px;
      .icon {
        color: $color_11;
        font-size: 1em;
      }
    }
  }
  .remove-board {
    position: absolute;
    width: 30px;
    height: 60px;
    top: -60px;
    right: 10px;
    font-weight: 700;
    line-height: 28px;
    color: $color_12;
    text-align: center;
    background-color: $background_color_13;
    opacity: 0.4;
    border-radius: 50%;
    transform-origin: center;
    transition: 0.2s ease-out;
    &:hover {
      transform: rotateZ(180deg);
      opacity: 0.8;
      background-color: $background_color_14;
    }
  }
  .board-item {
    &:hover {
      .remove-board {
        top: 10px;
        height: 30px;
      }
    }
    position: relative;
    overflow: hidden;
    margin: 10px;
    box-sizing: border-box;
    width: 300px;
    height: 200px;
    background-color: $background_color_15;
    cursor: pointer;
    border-radius: 3px;
    .title {
      display: inline-block;
      margin: 20px;
      height: 160px;
      overflow: hidden;
      font-size: 16px;
      font-weight: 700;
      word-break: break-all;
      word-wrap: break-word;
      color: $color_12;
    }
  }
  .board-items {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .create-new-board {
    background-color: $background_color_16;
    .title {
      margin-left: 0;
      color: $color_1;
      width: 100%;
      text-align: center;
      line-height: 160px;
    }
  }
}
</style>
