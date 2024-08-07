<template>
  <div class="card">
    <img :src="card.logo" class="card-img">
    <div class="card-desc">{{ card.desc | cutLongText }}</div>
  </div>
</template>

<script>

export default {
  props: {
    card: {
      type: Object,
      default: () => { }
    },
  },


  data() {
    return {

    }
  },

  methods: {
    getCards() {
      console.log(this.card)
    }
  },

  filters: {
    cutLongText(text) {
      const length = 20
        let result = ''
        if(length < text.length) {
          result = text.slice(0, length)
          result += '...'
        } else {
          result = text
        }
        return result
    }
  },

  mounted() {
    // this.getCards();
  },
}
</script>

<style lang="scss" scoped>
/* .card { */
  /* overflow: hidden; */
  /* 溢出隐藏 */
  /* line-height: 20px; */
  /* 设置行高与容器高度成倍数关系，这样避免文本溢出时，文字显示一半 */
  /* text-align: justify; */
  /* 设置文本对齐方式为两端对齐，这样在伪元素内容遮盖末尾文字时才能对齐*/
  /* position: relative; */
  /* 子绝父相，这里是为了给伪元素设置定位*/
/* }
 */
</style>
