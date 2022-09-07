<template>
  <div class="login">
    <van-nav-bar class="nav-bar" title="标题" left-arrow />
    <!-- 表单区域 -->
    <van-form @submit="onSubmit" class="from" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #button>
          <van-button
            block
            round
            class="sendBtn"
            type="default"
            native-type="button"
            v-if="isShowBtn"
            @click="sendCode"
            >发送验证码</van-button
          >
          <van-count-down
            v-else
            @finish="isShowBtn = true"
            :time="3 * 1000"
            format="sss"
          />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRules, codeRules } from '@/views/login/rules'
import { login, sendCodeAPI } from '@/api'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      mobile: '',
      mobileRules,
      codeRules,
      code: '',
      isShowBtn: true
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),
    // 表单验证通过才触发submit事件
    async onSubmit() {
      this.loading()
      try {
        const { data } = await login(this.mobile, this.code)
        console.log(data)
        // 将token传入vuex中
        this.SET_TOKEN(data.data)
        // 跳转路由
        this.$router.push('/profile')
        this.$toast.success('登陆成功')
      } catch (error) {
        // this.$toast.fail('登录失败')
        // axios出错
        if (error.reponse && error.reponse.status === 400) {
          this.$toast.fail(error.reponse.data.message)
        } else {
          // js错误，或返回507
          this.$toast.clear()
          throw error
        }
      }
    },
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
    },
    // 发送验证码
    async sendCode() {
      // 验证是否输入的正确的手机号
      await this.$refs.form.validate('mobile')
      // 手机号存在，发送请求
      this.loading()
      try {
        await sendCodeAPI(this.mobile)
        // 显示倒计时
        this.isShowBtn = false
        this.$toast.success('发送成功')
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 429 || error.response.status === 404)
        ) {
          // axios错误
          this.$toast(error.response.data.message)
        } else {
          // 清除loading提示
          this.$toast.clear()
          // 上报错误
          throw error
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.login {
  :deep(.nav-bar) {
    background-color: #3296fa;
    .van-nav-bar__title {
      color: #fff;
    }
    .van-icon {
      color: #fff;
    }
  }
  :deep(.from) {
    .van-field__label {
      flex: 1;
    }
    .van-cell__value {
      flex: 20;
    }
    .toutiao {
      font-size: 40px;
    }
    .van-button--info {
      background-color: #6db4fb;
      border: none;
      width: 693px;
      height: 88px;
      z-index: 3;
    }
  }
  .sendBtn {
    height: 0.64rem;
    background-color: #eee;
    color: #a88492;
  }
}
</style>
