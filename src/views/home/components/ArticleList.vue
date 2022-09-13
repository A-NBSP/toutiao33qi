<template>
  <div class="articleList">
    <van-pull-refresh v-model="isLoading" @refresh="getNextPageArticlie">
      <van-list
        @load="getNextPageArticlie"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了~"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :immediate-check="false"
      >
        <ArticleItem
          class="article"
          v-for="item in articles"
          :article="item"
          :key="item.atr_id"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api'
import ArticleItem from './ArticleItem.vue'
export default {
  name: 'articleList',
  components: { ArticleItem },
  props: {
    id: [String, Number]
  },
  data() {
    return {
      isLoading: false,
      articles: [],
      loading: false,
      finished: false, // false时load事件会触发，true时load事件不会再触发
      preTimeStamp: '', // 时间戳
      error: false
    }
  },
  created() {
    this.getFirstPageArticles()
  },
  methods: {
    // 获取第一页数据
    async getFirstPageArticles() {
      try {
        const { data } = await getArticles(this.id, +new Date())
        this.articles = data.data.results
        // 更新时间戳
        this.preTimeStamp = data.data.pre_timestamp
      } catch (error) {
        const status = error.response.status
        // js错误上抛,507原封不动上抛,400上抛具体错误
        if (!error.response && status === 507) {
          throw error
        } else {
          if (status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    },
    // 获取下一页数据
    async getNextPageArticlie() {
      try {
        const { data } = await getArticles(this.id, this.preTimeStamp)
        // 如果没有数据了，finished改为true，不再执行load
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        // loading为true时代表再执行下滑，否则为下拉刷新
        if (this.loading) {
          this.articles.push(...data.data.results)
        } else {
          this.articles.unshift(...data.data.results)
        }
        this.preTimeStamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        // try catch无论失败还是成功最后都会执行finally中的语句
        this.loading = false
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.articleList {
  height: calc(100vh - 92px - 83px - 100px);
  overflow: auto;
  // &: 代表当前元素他爹
  // ::-webkit-scrollbar : 滚动槽
  // ::-webkit-scrollbar-thumb: 滚动的滑块
  &::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #3296fa;
    border-radius: 10px;
  }
}
</style>
