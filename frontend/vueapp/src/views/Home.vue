<template>
  <div id="home">
    <!--头部-->
    <t-header></t-header>

    <main>
      <h2>
        <span class="icon icon-board"></span>
        看板列表
        <el-switch v-model="showPrivate" active-text="只展示私有"></el-switch>
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
            <li class="list-button list-remove" @click.prevent="showPostDialog(board, 'put')">
              设置
            </li>
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
            v-model="postBoardForm.title"
            @blur="showPostDialog"
            @keydown.enter.prevent="showPostDialog"
          ></textarea>
        </li>

        <el-dialog title="面板属性" :visible.sync="dialogFormVisible">
          <el-form :model="postBoardForm">
            <el-form-item label="面板标题">
              <el-input v-model="postBoardForm.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否私有">
              <el-switch v-model="postBoardForm.isPrivate" active-text="请设置是否私有"></el-switch>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="postBoardCancel">取 消</el-button>
            <el-button type="primary" @click="postBoard">确 定</el-button>
          </div>
        </el-dialog>
      </ul>
    </main>
  </div>
</template>

<script>
import THeader from '@/components/THeader';
import TListMenu from '@/components/TListMenu';
import { mapState } from 'vuex';
import { Switch, Dialog } from 'element-ui';

export default {
  name: 'Home',

  data() {
    return {
      isMoreShow: false,
      userName: JSON.parse(localStorage.getItem('user')).name,
      showPrivate: false,
      dialogFormVisible: false,
      requestType: null,
      postBoardForm: {
        id: null,
        title: '',
        isPrivate: false
      }
    };
  },

  components: {
    THeader,
    TListMenu,
    Switch,
    Dialog
  },

  computed: {
    ...mapState('board', {
      boards: state => state.boards,
      inited: state => state.inited
    })
  },

  created() {
    const privateStorage = JSON.parse(localStorage.getItem('privateStorage'));
    this.showPrivate = privateStorage;
    if (!this.inited && !privateStorage) {
      this.$store.dispatch('board/getPublicBoards');
    } else if (!this.inited && privateStorage) {
      this.$store.dispatch('board/getBoards');
    }
  },

  watch: {
    showPrivate: {
      handler(val) {
        const change = val;
        change
          ? this.$store.dispatch('board/getBoards')
          : this.$store.dispatch('board/getPublicBoards');
        localStorage.setItem('privateStorage', change);
      }
    }
  },

  methods: {
    showPostDialog(board, type) {
      this.dialogFormVisible = true;
      this.requestType = type;
      if (type === 'put') {
        this.postBoardForm.id = board.id;
        this.postBoardForm.isPrivate = board.isPrivate;
        this.postBoardForm.title = board.name;
      }
    },
    postBoardCancel() {
      this.postBoardForm = { id: null, title: '', isPrivate: false };

      this.dialogFormVisible = false;
    },

    async postBoard() {
      const type = this.requestType || 'post';
      const { title, isPrivate, id } = this.postBoardForm;
      console.log(type);
      if (title.trim() !== '') {
        try {
          await this.$store.dispatch(`board/${type}Board`, {
            id,
            name: title,
            isPrivate
          });

          this.dialogFormVisible = false;
          this.postBoardForm = { id: null, title: '', isPrivate: false };
          this.$message.success(`面板${type === 'post' ? '创建' : '更新'}成功`);
        } catch (e) {}
      }
    },

    async removeBorad(id) {
      try {
        await this.$store.dispatch('board/removeBoard', id);
        this.$message.success('面板删除成功');
      } catch (e) {}
    },
    onTogglePermission() {
      const change = !this.showPrivate;
      change
        ? this.$store.dispatch('board/getBoards')
        : this.$store.dispatch('board/getPublicBoards');
      localStorage.setItem('privateStorage', change);
      this.showPrivate = change;
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
