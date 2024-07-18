<template>
    <div>
        <h1>{{ $route.query.msg }}</h1>
        <el-button @click="handleClick">返回</el-button>
    </div>
</template>

<script>
    export default {
        mounted() {
            console.log(this.$route)
        },
        methods: {
            handleClick() {
              if(this.$route.query.from) {
                this.$router.push(this.$route.query.from)
              } else {
                this.$router.go(-1)
              }

            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
