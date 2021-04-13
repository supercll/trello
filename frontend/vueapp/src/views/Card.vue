<template>
    <div class="window-overlay" style="display: block" v-if="card && list">
        <!--弹出式窗口-->
        <div class="popup">
            <div class="popup-header">
                <div class="popup-title">
                    <div class="popup-title-icon">
                        <span class="icon icon-card"></span>
                    </div>
                    <div class="popup-title-text">
                        <textarea
                            class="form-field-input"
                            @keydown.enter="editCardName"
                            :value="card.name"
                        ></textarea>
                    </div>
                    <div class="popup-title-detail">在列表 {{list.name}} 中</div>
                </div>
                <a class="popup-header-close">
                    <i class="icon icon-close" @click="$router.back()"></i>
                </a>
            </div>

            <div class="popup-content">
                <!--描述-->
                <div class="window-module">
                    <div class="title">
                        <div class="title-icon">
                            <span class="icon icon-description"></span>
                        </div>
                        <div class="title-text">
                            <h3>描述</h3>
                        </div>
                    </div>

                    <p class="description">
                        <textarea
                            class="form-field-input"
                            @keydown.enter="editCardDescription"
                            :value="card.description"
                        ></textarea>
                    </p>
                </div>

                <!--附件-->
                <div class="window-module">
                    <div class="title">
                        <div class="title-icon">
                            <i class="icon icon-attachment"></i>
                        </div>
                        <div class="title-text">
                            <h3>附件</h3>
                        </div>
                    </div>

                    <ul class="attachments" v-if="Array.isArray(card.attachments)">
                        <li
                            class="attachment"
                            v-for="attachment of card.attachments"
                            :key="attachment.id"
                        >
                            <div
                                class="attachment-thumbnail"
                                :style="`background-image: url(${server.staticPath + attachment.path})`"
                            ></div>
                            <p class="attachment-detail">
                                <span class="attachment-thumbnail-name">
                                    <strong>{{attachment.detail.originName}}</strong>
                                </span>
                                <span class="attachment-thumbnail-descriptions">
                                    <span class="datetime">{{attachment.createdAt|dateTime}}</span>
                                    <span>-</span>
                                    <u @click="removeAttachment(attachment.id)">删除</u>
                                </span>
                                <span class="attachment-thumbnail-operation">
                                    <i class="icon icon-card-cover"></i>
                                    <u
                                        v-if="attachment.isCover"
                                        @click="removeCover(attachment.id)"
                                    >移除封面</u>
                                    <u v-else @click="setCover(attachment.id)">设为封面</u>
                                </span>
                            </p>
                        </li>
                    </ul>

                    <div>
                        <button class="btn btn-edit" @click="$refs.attachment.click()">添加附件</button>
                        <input
                            type="file"
                            ref="attachment"
                            style="display: none"
                            @change="uploadAttachment"
                        />
                    </div>
                </div>

                <!--活动-->
                <div class="window-module">
                    <div class="title">
                        <div class="title-icon">
                            <i class="icon icon-activity"></i>
                        </div>
                        <div class="title-text">
                            <h3>评论</h3>
                        </div>
                    </div>

                    <t-comment :card-id="card.id"></t-comment>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import dateTime from "@/filters/dateTime";
import TComment from "@/components/TComment";

export default {
    name: "Card",

    components: {
        TComment,
    },

    filters: {
        dateTime,
    },

    computed: {
        server() {
            return this.$store.state.server;
        },
        list() {
            return this.$store.getters["list/getList"](
                this.$route.params.listId
            );
        },
        card() {
            return this.$store.getters["card/getCard"](
                this.$route.params.cardId
            );
        },
    },

    methods: {
        async editCardName(e) {
            let { value, innerHTML } = e.target;

            if (value !== innerHTML) {
                try {
                    await this.$store.dispatch("card/editCard", {
                        id: this.card.id,
                        name: value,
                    });

                    this.$message.success("卡片名称修改成功");
                } catch (e) {}
            }
        },
        async editCardDescription(e) {
            let { value, innerHTML } = e.target;

            if (value !== innerHTML) {
                try {
                    await this.$store.dispatch("card/editCard", {
                        id: this.card.id,
                        description: value,
                    });

                    this.$message.success("卡片简介修改成功");
                } catch (e) {}
            }
        },

        // 上传附件
        async uploadAttachment() {
            let file = this.$refs.attachment.files[0];

            try {
                await this.$store.dispatch("card/uploadAttachment", {
                    boardListCardId: this.card.id,
                    file,
                });

                this.$refs.attachment.value = "";
                this.$message.success("上传成功");
            } catch (e) {}
        },

        async removeAttachment(id) {
            try {
                await this.$store.dispatch("card/removeAttachment", {
                    cardId: this.card.id,
                    id,
                });

                this.$message.success("封面移除成功");
            } catch (e) {}
        },

        async setCover(id) {
            try {
                await this.$store.dispatch("card/setCover", {
                    cardId: this.card.id,
                    id,
                });

                this.$message.success("封面设置成功");
            } catch (e) {}
        },

        async removeCover(id) {
            try {
                await this.$store.dispatch("card/removeCover", {
                    cardId: this.card.id,
                    id,
                });

                this.$message.success("封面取消成功");
            } catch (e) {}
        },
    },
};
</script>