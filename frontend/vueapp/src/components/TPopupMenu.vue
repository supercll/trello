<template>
    <ul class="popup-menu-list">
        <li  v-for="item of items" :key="item.name" :class="{separator: item.separator}" @click="command(item.command)"><span>{{item.name}}</span></li>
    </ul>
</template>

<script>
    export default {
        name: 'TPopupMenu',

        props: {
            items: {
                type: Array,
                default() {
                    // {name: '', command: 'logout', separator: true}
                    return [];
                }
            }
        },

        methods: {
            command(command) {
                this.$emit('command', command);
            }
        }
    }
</script>