<template>
  <div class="articleList">
    <ArticleItem v-for="item in articles" :article="item" :key="item.atr_id"></ArticleItem>
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
      articles: []
    }
  },
  created() {
    this.getFirstPageArticles()
  },
  methods: {
    async getFirstPageArticles() {
      try {
        const { data } = await getArticles(this.id, +new Date())
        this.articles = data.data.results
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
    }
  }
}
</script>

<style scoped lang="less"></style>
