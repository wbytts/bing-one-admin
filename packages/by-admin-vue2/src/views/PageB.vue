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
        path: "/test/msg", // to
        query: {
          msg: "PageA",
          from: this.$route.path // from
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
