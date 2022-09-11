<template>
  <div>
    <van-cell
      :title="article.title"
      :label="label"
      v-if="article.cover.type === 0"
    ></van-cell>
    <van-cell
      :title="article.title"
      v-else-if="article.cover.type === 1"
      :label="label"
    >
      <van-image
        width="100"
        height="100"
        :src="article.cover.images[0]"
      />
    </van-cell>
    <van-cell :title="article.title" v-else>
    <template #label>
      <van-image
        width="100"
        height="100"
        v-for="(item,index) in article.cover.images"
        :key="index"
        :src="item"
      />
    </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    label() {
      /*eslint-disable*/
      const { aut_name, comm_count, pubdate } = this.article
      return `${aut_name} ${comm_count}评论 ${pubdate}`
    }
  }
}
</script>

<style></style>
