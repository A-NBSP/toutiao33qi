<template>
  <div class="layout">
    <router-view></router-view>
    <!-- 底部导航 -->
    <!-- route开启路由模式 -->
    <van-tabbar route>
      <van-tabbar-item to="/ ">
        <template #icon>
          <span class="toutiao toutiao-shouye"></span>
        </template>
        首页</van-tabbar-item
      >
      <van-tabbar-item to="/video">
        <template #icon>
          <span class="toutiao toutiao-shipin"></span>
        </template>
        视频</van-tabbar-item
      >
      <van-tabbar-item to="/qa">
        <template #icon>
          <span class="toutiao toutiao-wenda"></span>
        </template>
        问答</van-tabbar-item
      >
      <van-tabbar-item to="/profile">
        <template #icon>
          <span class="toutiao toutiao-wode"></span>
        </template>
        {{ isLogin ? '我的' : '未登录' }}</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['isLogin'])
  }
}
</script>

<style scoped lang="less">
.toutiao {
  font-size: 36px;
}
</style>
