<template>
  <div>
    <el-button @click="handleClick">跳msg</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      this.$router.push({
        path: "/test/msg",
        query: {
          msg: "PageA",
          from: this.$route.path
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
