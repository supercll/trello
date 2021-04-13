<template>
  <div class="extrasMenu" ref="extrasMenu" @click.prevent="isMoreShow = !isMoreShow">
    <span class="icon icon-more"></span>
    <ul v-show="isMoreShow" class="list-menu">
      <li class="list-button list-remove" @click.prevent="remove">删除</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TListMenu',

  props: {
    id: {
      type: Number
    }
  },
  data() {
    return {
      isMoreShow: false
    };
  },

  methods: {
    remove() {
      this.$emit('removeEvent', this.id);
    }
  },
  mounted() {
    document.addEventListener('click', e => {
      // console.log(e.path.includes(this.$refs.extrasMenu));
      console.log();
      if (e.path.includes(this.$refs.extrasMenu)) return;
      this.isMoreShow = false;
    });
  }
};
</script>

<style lang="scss">
.extrasMenu {
  cursor: pointer;
  z-index: 2;

  .icon-more:hover {
    background-color: rgba(9, 30, 66, 0.08);
    color: #172b4d;
  }
  .list-remove {
    font-size: 13px;
    color: black;
  }
  .list-menu {
    position: absolute;
    right: 0px;
    background: white;
    border: solid 1px rgb(192, 189, 189);
    text-align: center;
    border-radius: 5px;
  }

  .list-button {
    padding: 1px 2px;

    &:hover {
      background: rgba(235, 226, 226, 0.5);
    }
  }
}
</style>
