<template>
  <div class="container">
    <div class="btns">
      <div v-for="(btn, index) in buttonArr" :key="btn[itemKey]" class="btn" :style="getBtnStyle(btn, index)"
      @click="handleClick(btn)"
      >{{ btn.label }}</div>
    </div>
  </div>
</template>

<script>
import {colorMap} from './utils.js'

export default {
  props: {
    buttonArr: {
      type: Array,
      default: () => []
    },
    // 此处的itemKey为当前传入数据的唯一字段名，以适配不同字段取名 默认为id
    itemKey: {
      type: String,
      default: 'id'
    },
    currentBtn: {
      type: [Number, String],
      default: ''
    }
  },
  data() {
    return {
    }
  },
  methods: {
    getBtnStyle(btn, index) {

      const color = colorMap[index % colorMap.length]

      if (btn[this.itemKey] === this.currentBtn) {
        return { backgroundColor: color, color: '#FFF' }
      } else {
        return { backgroundColor: '#FFF', color: color}
      }
    },
    handleClick(btn) {
      this.$emit("current-change", btn[this.itemKey])
    }
  }
}
</script>

<style lang="scss" scoped>
.container {

  padding: 10px;
  background-color: #EFEFEF;
  position: sticky;
  top: 84px;

  .btns {
    display: flex;
    justify-content: start;

    .btn {
      border-width: 1px;
      border-style: solid;
      border-radius: 4px;
      cursor: pointer;
      margin-left: 20px;
      padding: 4px 10px;
    }
  }


}
</style>
