<template>
  <div class="search">
    <!-- 搜索框 -->
    <!-- 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <form action="/">
      <van-search
        class="search"
        v-model.trim="keywords"
        background="#3396f8"
        placeholder="请输入搜索关键词"
        show-action
        @search="onsearch"
        @focus="isShowSearchResult = false"
        @cancel="$router.push('/')"
      />
    </form>

    <!-- 搜索历史/建议/结果 -->
    <component
      :is="componentName"
      @change-keywords="onsearch"
      :keywords="keywords"
    ></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchResult from './components/SearchResult.vue'
import { mapMutations, mapState } from 'vuex'
export default {
  components: { SearchHistory, SearchSuggestion, SearchResult },
  data() {
    return {
      keywords: '',
      isShowSearchResult: false
    }
  },
  computed: {
    ...mapState(['histories']),
    componentName() {
      // 搜索历史：关键词为空
      // 搜索建议：isShowSearchResult为true
      // 搜索结果：isShowSearchResult为false
      if (this.keywords === '') {
        return SearchHistory
      }
      if (this.isShowSearchResult) {
        return SearchResult
      }
      return SearchSuggestion
    }
  },
  methods: {
    ...mapMutations(['SET_HISTORIES']),
    onsearch(keywords) {
      this.keywords = keywords
      const distinctHistories = [...new Set([keywords, ...this.histories])]
      this.SET_HISTORIES(distinctHistories)
      this.isShowSearchResult = true
    }
  }
}
</script>

<style scoped lang="less">
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
