<template>
  <div>
    <van-cell
      icon="search"
      v-for="(item, index) in highlightSuggestion"
      :key="index"
      @click="$emit('change-keywords', suggestion[index])"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestionAPI } from '@/api'
import { debounce } from 'lodash'
export default {
  props: {
    keywords: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      suggestion: []
    }
  },
  watch: {
    keywords: {
      handler: 'getSuggestion',
      immediate: true
    }
  },
  computed: {
    highlightSuggestion() {
      const reg = new RegExp(this.keywords, 'ig')
      return this.suggestion.map((str) => {
        return str.replace(
          reg,
          (match) => `<span style='color:red'>${match}</span>`
        )
      })
    }
  },
  methods: {
    getSuggestion: debounce(async function () {
      try {
        const { data } = await getSuggestionAPI(this.keywords)
        this.suggestion = data.data.options.filter((item) => Boolean(item))
      } catch (error) {
        if (!error.reponse) {
          throw error
        }
      }
    }, 300)
  }
}
</script>

<style></style>
