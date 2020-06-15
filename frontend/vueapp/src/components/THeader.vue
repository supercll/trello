<template>
    <header>
        <div class="left">
            <router-link :to="{name: 'Home'}" class="btn btn-icon">
                <i class="icon icon-home"></i>
            </router-link>
            <router-link :to="{name: 'Home'}" class="btn btn-icon">
                <i class="icon icon-board"></i>
                <span class="txt">看板</span>
            </router-link>
        </div>
        <router-link :to="{name: 'Home'}" class="logo"></router-link>
        <div class="right">
            <a href="" class="btn btn-icon">
                <i class="icon icon-add"></i>
            </a>

            <t-popup :title="user.name" ref="tPopup">
                <button class="avatar">
                    <span>{{user.name[0].toUpperCase()}}</span>
                </button>

                <t-popup-menu slot="content" :items="menuItems" @command="execute"></t-popup-menu>
            </t-popup>
        </div>
    </header>
</template>

<script>
    import TPopup from "@/components/TPopup";
    import TPopupMenu from "@/components/TPopupMenu";
    import {mapState} from 'vuex';

    export default {
        name: 'THeader',

        components: {
            TPopup,
            TPopupMenu
        },

        data() {
            return {
                menuItems: [
                    {name: '退出', command: 'logout'}
                ]
            }
        },

        computed: {
            ...mapState('user', {
                user: state => state.info
            })
        },

        methods: {
            execute(command) {
                switch (command) {
                    case 'logout':
                        this.logout();
                        break;
                    default:
                        break;
                }
            },

            logout() {
                this.$store.dispatch('user/logout');

                this.$router.push({name: 'Login'});
                // this.$refs.tPopup.close();
            }
        }
    }
</script>