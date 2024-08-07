<template>
  <ul>
    <li :class="{active: activeName === '首页'}" @click="handleSelectMenu('首页')">首页</li>
    <li :class="{active: activeName === '热门资讯'}" @click="handleSelectMenu('热门资讯')">热门资讯</li>
    <li :class="{active: activeName === '博客'}" @click="handleSelectMenu('博客')">博客</li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      activeName: '首页'
    }
  },
  methods: {
    handleSelectMenu(name) {
      this.activeName = name
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  width: 220px;
  height: 100%;
  margin-top: 0;
  margin-bottom: 0;

  li {
    color: #FFF;
    margin-left: 0;
  }
}

.active {
  color: red;
}
</style>
