<template>
  <div
    class="list-wrap list-wrap-content"
    :class="{ 'list-adding': listAdding }"
    :data-order="data.order"
  >
    <div class="list-placeholder" ref="listPlaceholder"></div>

    <div class="list" ref="list">
      <div class="list-header" ref="listHeader">
        <textarea
          class="form-field-input"
          ref="newBoardListName"
          @mousedown.prevent
          @blur="editListName"
          >{{ data.name }}</textarea
        >
        <!-- <div
                    class="extras-menu"
                    ref="extrasMenu"
                    @click.prevent="isMoreShow = !isMoreShow;"
                >
                    <span class="icon icon-more"></span>
                    <ul v-show="isMoreShow" class="list-menu">
                        <li class="list-button list-remove" @click="removeList">删除此列表</li>
                    </ul>
                </div> -->
        <TListMenu class="Tlist-menu">
          <li class="list-button list-remove" @click.prevent="removeList">删除此列表</li>
        </TListMenu>
      </div>

      <div class="list-cards">
        <t-card v-for="card of undoneCards" :data="card" :key="card.id"></t-card>

        <div class="list-card-add-form">
          <textarea
            class="form-field-input"
            placeholder="为这张卡片添加标题……"
            ref="newListName"
          ></textarea>
        </div>
      </div>

      <div class="list-footer">
        <div class="list-card-add" @click="showListCardAddForm">
          <span class="icon icon-add"></span>
          <span>添加另一张卡片</span>
        </div>
        <div class="list-add-confirm">
          <button class="btn btn-success" @click="addNewCard">添加卡片</button>
          <span class="icon icon-close" @click="hideListCardAddForm"></span>
        </div>
      </div>

      <div class=" list-done" v-if="doneCards.length !== 0">
        <div class="list-header">
          <textarea class="form-field-input" readonly>已完成任务</textarea>

          <TListMenu class="Tlist-menu">
            <li @click.prevent="removeCards">删除已完成</li>
          </TListMenu>
        </div>

        <div class="list-cards">
          <t-card v-for="card of doneCards" :data="card" :key="card.id"></t-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TCard from '@/components/TCard';
import TListMenu from '@/components/TListMenu';

export default {
  name: 'TList',

  components: {
    TCard,
    TListMenu
  },

  props: {
    data: {
      type: Object
    }
  },

  data() {
    return {
      drag: {
        isDown: false,
        isDrag: false,
        downClientX: 0,
        downClientY: 0,
        downElementX: 0,
        downElementY: 0
      },
      listAdding: false,
      isMoreShow: false,
      idList: []
    };
  },

  computed: {
    cards() {
      return this.$store.getters['card/getCards'](this.data.id);
    },
    undoneCards() {
      return this.$store.getters['card/getUndoneCards'](this.data.id);
    },
    doneCards() {
      const cardList = this.$store.getters['card/getDoneCards'](this.data.id);
      return cardList;
    }
  },

  async created() {
    if (!this.cards.length) {
      await this.$store.dispatch('card/getCards', this.data.id);
    }
  },

  mounted() {
    this.$refs.listHeader.addEventListener('mousedown', this.dragDown);
    document.addEventListener('mousemove', this.dragMove);
    document.addEventListener('mouseup', this.dragUp);
  },

  methods: {
    dragDown(e) {
      this.drag.isDown = true;
      this.drag.downClientX = e.clientX;
      this.drag.downClientY = e.clientY;
      let pos = this.$refs.list.getBoundingClientRect();
      this.drag.downElementX = pos.x;
      this.drag.downElementY = pos.y;
    },

    dragMove(e) {
      if (this.drag.isDown) {
        let listElement = this.$refs.list;
        let x = e.clientX - this.drag.downClientX;
        let y = e.clientY - this.drag.downClientY;

        // 触发拖拽的条件
        if (x > 10 || y > 10) {
          if (!this.drag.isDrag) {
            this.drag.isDrag = true;

            this.$refs.listPlaceholder.style.height = listElement.offsetHeight + 'px';

            listElement.style.position = 'absolute';
            listElement.style.zIndex = 99999;
            listElement.style.transform = 'rotate(5deg)';
            document.body.appendChild(listElement);

            this.$emit('dragStart', {
              component: this
            });
          }

          listElement.style.left = this.drag.downElementX + x + 'px';
          listElement.style.top = this.drag.downElementY + y + 'px';

          this.$emit('dragMove', {
            component: this,
            x: e.clientX,
            y: e.clientY
          });
        }
      }
    },

    dragUp(e) {
      if (this.drag.isDown) {
        if (this.drag.isDrag) {
          let listElement = this.$refs.list;

          this.$refs.listPlaceholder.style.height = 0;

          listElement.style.position = 'relative';
          listElement.style.zIndex = 0;
          listElement.style.left = 0;
          listElement.style.top = 0;
          listElement.style.transform = 'rotate(0deg)';
          this.$el.appendChild(listElement);

          this.$emit('dragEnd', {
            component: this
          });
        } else {
          if (e.path.includes(this.$refs.newBoardListName)) {
            this.$refs.newBoardListName.select();
          }
        }

        this.drag.isDown = this.drag.isDrag = false;
      }
    },

    async editListName() {
      let { value, innerHTML } = this.$refs.newBoardListName;
      // console.log(val, this.$refs.newBoardListName.innerHTML);
      if (value !== innerHTML) {
        await this.$store.dispatch('list/editList', {
          boardId: this.data.boardId,
          id: this.data.id,
          name: value
        });
      }
    },

    // 添加列表
    showListCardAddForm() {
      this.listAdding = true;
      this.$nextTick(() => {
        this.$refs.newListName.focus();
      });
    },

    // 删除列表
    async removeList() {
      await this.$store.dispatch('list/removeList', {
        boardId: this.data.boardId,
        id: this.data.id
      });

      this.$message.success('列表删除成功');
    },
    // 删除卡片
    async removeCards() {
      try {
        const idList = this.doneCards.map(item => item.id);
        await this.$store.dispatch('card/removeCards', {
          idList
        });
        this.$message.success('卡片删除成功');
      } catch (e) {}
    },

    hideListCardAddForm() {
      this.listAdding = false;
      this.$refs.newListName.value = '';
    },

    async addNewCard() {
      let { value } = this.$refs.newListName;

      if (value.trim() !== '') {
        try {
          await this.$store.dispatch('card/postCard', {
            boardListId: this.data.id,
            name: value
          });

          this.$message.success('添加成功');

          this.listAdding = false;
        } catch (e) {}
      } else {
        this.$refs.newListName.focus();
      }
    }
  }
};
</script>

<style lang="scss">
.Tlist-menu {
  position: absolute;
  right: 0;
  top: 0;

  .icon {
    color: rgb(0, 121, 191);
  }
}

.list-wrap {
  position: relative;
  display: inline-block;
  margin: 0 4px;
  box-sizing: border-box;
  vertical-align: top;
  width: 300px;
  border-radius: 3px;
  .list-placeholder {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 0;
    background-color: rgba(0, 0, 0, 0.12);
    border-radius: 3px;
  }
}
.list {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 0;
  max-height: 100%;
  background-color: #ebecf0;
  box-shadow: 10px 10px 20px rgba(9, 30, 66, 0.25);
  border-radius: 3px;
}
.list-header {
  position: relative;
  padding: 10px 36px 10px 8px;
  min-height: 20px;
}

.list-done {
  margin-top: 10px;
  textarea {
    color: rgb(59, 170, 59);
  }
}
</style>
