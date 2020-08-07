<template>
    <div>
        <div class="comment-post">
            <div class="avatar">
                <span>{{user.name[0].toUpperCase()}}</span>
            </div>
            <div class="comment-content-box editing">
                <textarea class="comment-content-input" placeholder="添加评论……" ref="content"></textarea>
                <button class="btn btn-edit" @click="postNewComment">保存</button>
            </div>
        </div>

        <ul class="comments" v-if="comments.rows">
            <li class="comment" v-for="comment of comments.rows" :key="comment.id">
                <div class="avatar">
                    <span>{{comment.user.name[0].toUpperCase()}}</span>
                </div>
                <div class="description">
                    <div class="header">
                        <strong>{{comment.user.name}}</strong>
                        <span>at</span>
                        <i>{{comment.createdAt|dateTime}}</i>
                    </div>
                    <div class="content">{{comment.content}}</div>
                </div>
            </li>
        </ul>

        <div class="comment-pagination">
            <t-pagination :pages="comments.pages" :page="comments.page" @changePage="changePage"></t-pagination>
        </div>
    </div>
</template>

<script>
import dateTime from "@/filters/dateTime";
import TPagination from "@/components/TPagination";

export default {
    name: "TComment",

    filters: {
        dateTime
    },

    components: {
        TPagination
    },

    props: {
        cardId: {
            type: Number,
            required: true
        }
    },

    data() {
        return {
            comments: {}
        };
    },

    computed: {
        user() {
            return this.$store.state.user.info;
        }
    },

    async created() {
        await this.getComments();
    },

    methods: {
        async getComments(page = 1) {
            try {
                let rs = await this.$store.dispatch("comment/getComments", {
                    boardListCardId: this.cardId,
                    page
                });

                this.comments = rs.data;
            } catch (e) {}
        },

        async postNewComment() {
            let { value } = this.$refs.content;

            try {
                if (value.trim() !== "") {
                    let rs = await this.$store.dispatch("comment/postComment", {
                        boardListCardId: this.cardId,
                        content: value
                    });

                    this.$message.success("评论成功");

                    await this.getComments();
                }
                this.$refs.content.value = "";
                this.$refs.content.focus();
            } catch (e) {}
        },

        async changePage(page) {
            await this.getComments(page);
        }
    }
};
</script>