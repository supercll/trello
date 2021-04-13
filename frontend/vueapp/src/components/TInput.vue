<template>
  <div class="TInput">
    <input type="checkbox" :checked="status" @click.prevent="toggleStatus" />
  </div>
</template>

<script>
export default {
  name: 'TInput',

  props: {
    status: {
      type: Boolean,
      defualt: false
    },
    id: {
      type: Number
    }
  },

  methods: {
    toggleStatus() {
      this.$emit('clickEvent', this.id);
    }
  }
};
</script>

<style lang="scss">
.TInput {
  input {
    cursor: pointer;
  }
}
</style>
