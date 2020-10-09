<template>
    <div class="pagination">
        <span v-if="firstShowPage > 1" @click="gotoPage(1)">首页</span>
        <span v-if="page > 1" @click="gotoPage(page - 1)">上一页</span>
        <span @click="gotoPage(page - showPagesNumber)">...</span>
        <span
            v-for="showPage of showPages"
            :key="showPage"
            :class="{'current-page': showPage === page}"
            @click="gotoPage(showPage)"
        >{{showPage}}</span>
        <span>...</span>
        <span @click="gotoPage(page + 1)">下一页</span>
        <span @click="gotoPage(pages)">尾页</span>
    </div>
</template>

<script>
export default {
    name: "TPagination",

    props: {
        pages: {
            type: Number,
            default: 1,
        },
        page: {
            type: Number,
            default: 1,
        },
    },

    data() {
        return {
            showPagesNumber: 5,
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
        },
    },

    methods: {
        gotoPage(n) {
            n = Math.max(1, n);
            n = Math.min(this.pages, n);

            if (n !== this.page) {
                this.$emit("changePage", n);
            }
        },
    },
};
</script>