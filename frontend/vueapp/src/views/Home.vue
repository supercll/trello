<template>
  <div id="home">
    <!--头部-->
    <t-header></t-header>

    <main>
      <h2>
        <span class="icon icon-board"></span>
        我的看板
      </h2>
      <ul class="board-items">
        <router-link
          tag="li"
          v-for="board of boards"
          :key="board.id"
          class="board-item"
          :to="{ name: 'Board', params: { id: board.id } }"
        >
          <TListMenu class="bord-menu" :id="board.id" @removeEvent="removeBorad" />
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
      isMoreShow: false
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
    if (!this.inited) {
      this.$store.dispatch('board/getBoards');
    }
  },

  methods: {
    async postBoard() {
      let val = this.$refs.newBoardName.value;

      if (val.trim() !== '') {
        try {
          await this.$store.dispatch('board/postBoard', {
            name: val
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
</style>
