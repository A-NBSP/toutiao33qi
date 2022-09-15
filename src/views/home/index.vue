<template>
  <div>
    <!-- 搜索框 -->
    <van-nav-bar class="nav-bar">
      <template #title>
        <van-button icon="search" @click="$router.push('/search')" size="small" round block>搜索</van-button>
      </template>
    </van-nav-bar>
    <!-- 频道及文章展示 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>
      <span class="toutiao toutiao-gengduo" @click="isShow = true"></span>
    </van-tabs>
    <van-popup
      v-model="isShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <ChannelEdit
        v-if="isShow"
        :mychannels="channels"
        @change-active=";[(isShow = false), (active = $event)]"
        @del-channel="delChannel"
        @add-channel="addChannel"
      ></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getChannelAPI, delChannelAPI, addChannelAPI } from '@/api'
import ArticleList from '@/views/home/components/ArticleList.vue'
import ChannelEdit from '@/views/home/components/ChannelEdit'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      active: 0,
      channels: [],
      isShow: false
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  methods: {
    ...mapMutations(['SET_MY_CHANNELS']),
    initChannels() {
      // 如果用户登录了，获取自己的频道列表
      if (this.isLogin) {
        this.getChannel()
      } else {
        // 如果没有登录且本地无数据，获取默认频道
        const mychannels = this.$store.state.myChannels
        if (mychannels.length === 0) {
          this.getChannel()
        } else {
          // 如果本地有数据，使用本地
          this.channels = mychannels
        }
      }
    },
    async getChannel() {
      // ?? ==>相当于||,常用于语句中
      // ?. ==>可选链操作符,?前面是undifined或null,后面不会执行
      try {
        const { data } = await getChannelAPI()
        this.channels = data.data.channels
      } catch (error) {
        if (!error.response) {
          throw error
        } else {
          const status = error.response.status
          status === 507 && this.$toast.fail('请刷新')
        }
      }
    },
    // 删除频道
    async delChannel(id) {
      // 登录状态，使用用户自己的频道
      // 未登录状态，不强制登录，将数据存入本地中
      try {
        const newChannels = this.channels.filter((item) => item.id !== id)
        // 1.发送删除请求
        if (this.isLogin) {
          await delChannelAPI(id)
        } else {
          // 把我的频道存入本地中
          this.SET_MY_CHANNELS(newChannels)
        }
        // 2.删除视图层
        this.channels = newChannels
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('请登录')
        } else {
          throw error
        }
      }
    },
    // 添加频道
    async addChannel(channel) {
      try {
        if (this.isLogin) {
          await addChannelAPI(channel.id, this.channels.length)
        } else {
          // 把我的频道存入本地中
          this.SET_MY_CHANNELS([...this.channels, channel])
        }
        this.channels.push(channel)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('请登录')
        } else {
          throw error
        }
      }
    }
  },
  created() {
    this.initChannels()
  },
  components: {
    ArticleList,
    ChannelEdit
  }
}
</script>

<style scoped lang="less">
.nav-bar {
  background-color: #3396fc;
  .van-button--block {
    width: 7.4rem;
  }
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .van-button--default {
    background-color: #4faeff;
    border: none;
    color: #fff;
    font-size: 30px;
    .van-icon {
      color: #fff;
    }
  }
}
/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}
/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
</style>
