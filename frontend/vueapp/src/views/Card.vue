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
                        <textarea class="form-field-input" @blur="editCardName">{{card.name}}</textarea>
                    </div>
                    <div class="popup-title-detail">
                        在列表 {{list.name}} 中
                    </div>
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
                            <button class="btn btn-edit">编辑</button>
                        </div>
                    </div>

                    <p class="description">
                        <textarea class="form-field-input" @blur="editCardDescription">{{card.description}}</textarea>
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
                        <li class="attachment" v-for="attachment of card.attachments" :key="attachment.id">
                            <div class="attachment-thumbnail" :style="`background-image: url(${server.staticPath}${attachment.path})`"></div>
                            <p class="attachment-detail">
                                <span class="attachment-thumbnail-name"><strong>{{attachment.detail.name}}</strong></span>
                                <span class="attachment-thumbnail-descriptions">
                                    <span class="datetime">
                                        {{attachment.createdAt|dateTime}}
                                    </span>
                                    <span> - </span>
                                    <u>删除</u>
                                </span>
                                <span class="attachment-thumbnail-operation">
                                    <i class="icon icon-card-cover"></i>
                                    <u>移除封面</u>
                                </span>
                            </p>
                        </li>
                    </ul>

                    <div>
                        <button class="btn btn-edit">添加附件</button>
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

                    <div class="comment-post">
                        <div class="avatar">
                            <span>Z</span>
                        </div>
                        <div class="comment-content-box editing">
                            <textarea class="comment-content-input" placeholder="添加评论……"></textarea>
                            <button class="btn btn-edit">保存</button>
                        </div>
                    </div>

                    <ul class="comments">
                        <li class="comment">
                            <div class="avatar">
                                <span>Z</span>
                            </div>
                            <div class="description">
                                <div class="header">
                                    <strong>zMouse</strong>
                                    <span> at </span>
                                    <i>2019年12月29日晚上11点04分</i>
                                </div>
                                <div class="content">
                                    非常不错！！
                                </div>
                            </div>
                        </li>
                        <li class="comment">
                            <div class="avatar">
                                <span>Z</span>
                            </div>
                            <div class="description">
                                <div class="header">
                                    <strong>zMouse</strong>
                                    <span> at </span>
                                    <i>2019年12月29日晚上11点04分</i>
                                </div>
                                <div class="content">
                                    非常不错！！
                                </div>
                            </div>
                        </li>
                        <li class="comment">
                            <div class="avatar">
                                <span>Z</span>
                            </div>
                            <div class="description">
                                <div class="header">
                                    <strong>zMouse</strong>
                                    <span> at </span>
                                    <i>2019年12月29日晚上11点04分</i>
                                </div>
                                <div class="content">
                                    非常不错！！
                                </div>
                            </div>
                        </li>
                        <li class="comment">
                            <div class="avatar">
                                <span>Z</span>
                            </div>
                            <div class="description">
                                <div class="header">
                                    <strong>zMouse</strong>
                                    <span> at </span>
                                    <i>2019年12月29日晚上11点04分</i>
                                </div>
                                <div class="content">
                                    非常不错！！
                                </div>
                            </div>
                        </li>
                        <li class="comment">
                            <div class="avatar">
                                <span>Z</span>
                            </div>
                            <div class="description">
                                <div class="header">
                                    <strong>zMouse</strong>
                                    <span> at </span>
                                    <i>2019年12月29日晚上11点04分</i>
                                </div>
                                <div class="content">
                                    非常不错！！
                                </div>
                            </div>
                        </li>
                        <li class="comment">
                            <div class="avatar">
                                <span>Z</span>
                            </div>
                            <div class="description">
                                <div class="header">
                                    <strong>zMouse</strong>
                                    <span> at </span>
                                    <i>2019年12月29日晚上11点04分</i>
                                </div>
                                <div class="content">
                                    非常不错！！
                                </div>
                            </div>
                        </li>
                    </ul>

                    <div class="comment-pagination">
                        <div class="pagination">
                            <span>首页</span>
                            <span>上一页</span>
                            <span>...</span>
                            <span>4</span>
                            <span>5</span>
                            <span class="current-page">6</span>
                            <span>7</span>
                            <span>8</span>
                            <span>...</span>
                            <span>下一页</span>
                            <span>尾页</span>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>

<script>

    import dateTime from '@/filters/dateTime';

    export default {
        name: 'Card',

        filters: {
            dateTime
        },

        computed: {
            server() {
                return this.$store.state.server;
            },
            list() {
                return this.$store.getters['list/getList'](this.$route.params.listId)
            },
            card() {
                return this.$store.getters['card/getCard'](this.$route.params.cardId)
            }
        },

        methods: {
            editCardName(e) {
                let {value, innerHTML} = e.target;

                if (value !== innerHTML) {
                    try {
                        this.$store.dispatch('card/editCard', {
                            id: this.card.id,
                            name: value,
                        });

                        this.$message.success('卡片名称修改成功');
                    } catch (e) {}
                }
            },
            editCardDescription(e) {
                let {value, innerHTML} = e.target;

                if (value !== innerHTML) {
                    try {
                        this.$store.dispatch('card/editCard', {
                            id: this.card.id,
                            description: value,
                        });

                        this.$message.success('卡片简介修改成功');
                    } catch (e) {}
                }
            }
        }
    }
</script>