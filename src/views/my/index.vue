<template>
  <div class="profile">
    <header>
      <div class="login banner" v-if="isLogin">
        <van-row></van-row>
        <van-row class="userInfo">
          <van-col span="12" class="left">
            <van-image
              width="1.5rem"
              height="1.5rem"
              round
              src="https://img01.yzcdn.cn/vant/cat.jpeg"
            />
            <span class="mobile">13111111111</span>
          </van-col>
          <van-col span="5" offset="7">
            <van-button round size="mini" class="edit-btn">编辑资料</van-button>
          </van-col>
        </van-row>
        <van-row>
          <van-grid class="grid" :border="false">
            <van-grid-item text="头条">
              <template #icon>0</template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon>0</template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon>0</template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon>0</template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <div class="logout banner" v-else @click="$router.push('/login')">
        <img class="img" src="@/assets/images/mobile.png" alt="" />
        <span class="text">登录 / 注册</span>
      </div>
    </header>
    <main>
      <van-grid :column-num="2" :border="false" clickable>
        <van-grid-item text="收藏">
          <template #icon>
            <span class="toutiao toutiao-shoucang"></span
          ></template>
        </van-grid-item>
        <van-grid-item text="历史">
          <template #icon>
            <span class="toutiao toutiao-lishi"></span
          ></template>
        </van-grid-item>
      </van-grid>
      <div class="link">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
    </main>
    <footer>
      <!-- 点击清除token -->
      <van-button v-if="isLogin" block @click="logout">退出</van-button>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isLogin'])
  },
  methods: {
    async logout() {
      await this.$dialog.confirm({
        title: '黑马头条',
        message: '是否确认退出该账号'
      })
      this.$store.commit('SET_TOKEN', {})
    }
  }
}
</script>

<style scoped lang="less">
.profile {
  background-color: #f5f6f9;
  height: 100vh;
}
.banner {
  width: 100%;
  height: 5.3333rem;
  background: url('@/assets/images/banner.png') no-repeat 0 0 / cover;
}
.logout {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .img {
    width: 1.76rem;
    height: 1.76rem;
  }
  .text {
    font-size: 30px;
    color: #fff;
    margin-top: 0.125rem;
  }
}
.login {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
  .userInfo {
    display: flex;
    align-items: center;
    .left {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .mobile {
        font-size: 30px;
        color: #fff;
      }
    }
    .edit-btn {
      width: 1.6rem;
      height: 0.42667rem;
      color: #666;
    }
  }
  :deep(.grid) {
    color: #fff;
    .van-grid-item__content--center {
      font-size: 30px;
      background-color: inherit;
      .van-grid-item__text {
        margin-top: 8px;
        color: #fff;
      }
    }
  }
}
.link {
  margin: 10px 0;
}
.toutiao {
  font-size: 40px;
}
.toutiao-shoucang {
  color: red;
}
.toutiao-lishi {
  color: orange;
}
</style>
