<template>
  <div class="pagination">
    <span v-show="firstShowPage > 1" @click="gotoPage(1)">首页</span>
    <span v-show="page > 1" @click="gotoPage(page - 1)">上一页</span>
    <span @click="gotoPage(page - showPagesNumber)">...</span>
    <span
      v-for="showPage of showPages"
      :key="showPage"
      :class="{ 'current-page': showPage === page }"
      @click="gotoPage(showPage)"
    >
      {{ showPage }}
    </span>
    <span v-show="page < pages - 2" @click="gotoPage(page + showPagesNumber)">...</span>
    <span v-show="page < pages" @click="gotoPage(page + 1)">下一页</span>
    <span v-show="lastShowPage < pages" @click="gotoPage(pages)">尾页</span>
  </div>
</template>

<script>
export default {
  name: 'TPagination',

  props: {
    pages: {
      type: Number,
      default: 1
    },
    page: {
      type: Number,
      default: 1
    }
  },

  data() {
    return {
      showPagesNumber: 5
    };
  },

  computed: {
    showPages() {
      let s = this.page;
      let e = this.page;
      let arr = [this.page];
      let p = this.showPagesNumber - 1;

      while (p > 0) {
        if (p > 0 && s > 1) {
          arr.unshift(--s);
          p--;
        }
        if (p > 0 && e < this.pages) {
          arr.push(++e);
          p--;
        }
        if (s <= 1 && e >= this.pages) break;
      }

      return arr;
    },

    firstShowPage() {
      return this.showPages[0];
    },

    lastShowPage() {
      return this.showPages[this.showPages.length - 1];
    }
  },

  methods: {
    gotoPage(n) {
      n = Math.max(1, n);
      n = Math.min(this.pages, n);

      if (n !== this.page) {
        this.$emit('changePage', n);
      }
    }
  }
};
</script>

<style lang="scss">
.pagination {
  margin: 10px 0;
  span {
    padding: 5px 10px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    cursor: pointer;
    &:hover {
      background-color: $background_color_16;
    }
  }
  span.current-page {
    background-color: $background_color_24;
    color: $color_12;
  }
}
</style>
