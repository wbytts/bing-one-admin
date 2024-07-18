<template>
  <div class="home">
    <input v-model="val" type="text">
    <el-button @click="handleToMsg">跳转Msg</el-button>
    <el-button @click="$router.push('/page/a')">跳转PageA</el-button>
    <el-button @click="$router.push('/page/b')">跳转PageB</el-button>
    <el-button @click="handleToUser">跳转User</el-button>
    <el-button @click="handleToRouteProps">RouteProps</el-button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
  data() {
    return {
      val: 'Hello World'
    }
  },
  methods: {
    handleToMsg() {
      this.$router.push({
        path: "/test/msg?t=123",
        query: {
          msg: this.val,
          from: this.$route.path
        }
      })
    },

    handleToUser() {
      this.$router.push({
        path: '/user/123?t=123'
      })
    },

    handleToRouteProps() {
      this.$router.push({
        path: '/test/route/props/' + this.val,
      })
    }
  }
};
</script>
