<template>
  <router-link
    :to="{ name: 'Card', params: { listId: data.boardListId, cardId: data.id } }"
    class="list-card"
    v-if="data"
  >
    <div
      v-if="data.coverPath"
      class="list-card-cover"
      :style="`background-image: url(${server.staticPath + data.coverPath});`"
    ></div>
    <div class="list-card-title">{{ data.name }}</div>
    <div class="list-card-badges">
      <div class="badge">
        <span class="icon icon-description"></span>
      </div>
      <div class="badge">
        <span class="icon icon-comment"></span>
        <span class="text">{{ data.commentCount }}</span>
      </div>
      <div class="badge">
        <span class="icon icon-attachment"></span>
        <span class="text">{{ data.attachments.length }}</span>
      </div>
      <TInput class="cardInput" :id="data.id" :status="data.status" @clickEvent="toggleStatus" />
    </div>
  </router-link>
</template>

<script>
import TInput from '@/components/TInput';
export default {
  name: 'TCard',
  components: {
    TInput
  },

  computed: {
    server() {
      return this.$store.state.server;
    }
  },
  props: {
    data: {
      type: Object
    }
  },
  methods: {
    async toggleStatus(id) {
      // this.data.status = !this.data.status

      try {
        await this.$store.dispatch('card/editCard', {
          id,
          status: !this.data.status
        });

        this.$message.success('卡片状态改变成功');
      } catch (e) {}
    }
  }
};
</script>

<style lang="scss">
.cardInput {
  position: absolute;
  right: 5px;
  bottom: 0;
}
</style>
