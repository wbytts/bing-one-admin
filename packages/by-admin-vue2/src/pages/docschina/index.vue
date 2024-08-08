<template>
  <div class="page">
    <Header />

    <div style="margin-top: 84px;">
      <ImageSwiper />
    </div>

    <Tabs :buttonArr="docTypeList" :current-btn="currentBtn" item-key="id" @current-change="handleCurrentTagChange">
    </Tabs>

    <div class="content-container">
      <template v-for="docType in docTypeList">
        <div>
          <div class="header">
            <Slash />
            <span>{{ docType.label }}</span>
            <Slash />
          </div>
          <div class="card-group">
            <div v-for="card in docType.list" :key="card.id">
              <TabContent :card="card"></TabContent>
            </div>
          </div>
        </div>
      </template>

    </div>

  </div>
</template>

<script>
import Header from './Header.vue'
import ImageSwiper from './ImageSwiper.js'
import Tabs from './Tabs.vue'
import TabContent from './TabContent.vue'
import axios from 'axios'
import Slash from '../docschina/svg/Slash.vue'


export default {
  components: { Header, ImageSwiper, Tabs, TabContent, Slash },
  data() {
    return {
      currentBtn: '',
      docTypeList: [],
    }
  },
  methods: {
    handleCurrentTagChange(key) {
      this.currentBtn = key
    },

    async getDocTypeList() {
      let { data: { pageProps: { homeData } } } = await axios.get('/docschina/_next/data/EFjARb3FIYKz_RA01p6Ao/index.json');
      // console.log(homeData)
      this.docTypeList = homeData.map(item => {
        item.list = item.lists
        return item
      })

      this.currentBtn = this.docTypeList[0]?.id
    }

    // 0,0,0  ->  255,255,255
  },
  mounted() {

    this.getDocTypeList();

    // 获取数据

    window.addEventListener('scroll', () => {
      console.log("页面在滚动...")
    })
  },

}
</script>

<style lang="scss" scoped>
.page {
  text-align: center;
}

.header {
  text-align: center;
}


.content-container {
  margin: 0 auto;
  width: 80%;
}


.card-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  border: 1px solid red;
  box-sizing: border-box;
  margin: 0 auto;

  // 学习优先级：scss > less > stylus

  // 常见的样式穿透写法; 如果是新技术，基本都是 :deep()
  // :deep(xxx)
  // >>>
  // ::v-deep
  // /deep/
  :deep(.card) {
    background-color: #FFF;
    width: 100px;
    height: 120px;
    font-size: 12px;
    margin: {
      top: 10px;
      right: 10px;
      left: 10px;
      bottom: 10px;
    }
    border-radius: 20px;
    text-align: center;
    padding: 10px;

    box-shadow: rgba(163, 177, 191, 0.35) 0px 8px 24px;
    

    .card-img {
      width: 45px;
      height: 45px;
      border-radius: 10px;
      margin-bottom: 6px;
    }
  }
}


// border
// box-shadow
// outline

</style>
