<template>
    <div id="home">
        <!--头部-->
        <t-header></t-header>

        <main>

            <h2>
                <span class="icon icon-board"></span>
                我的看板
            </h2>
            <ul class="board-items">
                <li class="board-item">
                    <span class="title">test</span>
                </li>
                <li  class="board-item">
                    <span class="title">共同努力吧！</span>
                </li>
                <li  class="board-item">
                    <span class="title">Welcome Board</span>
                </li>
                <li  class="board-item create-new-board">
                    <textarea class="title form-field-input" placeholder="创建新看板"></textarea>
                </li>
            </ul>

        </main>
    </div>
</template>

<script>
    import THeader from "@/components/THeader";

    export default {
        name: 'Home',

        components: {
            THeader
        }
    }
</script>