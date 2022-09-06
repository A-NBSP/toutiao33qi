<template>
  <div class="login">
    <van-nav-bar class="nav-bar" title="标题" left-arrow />
    <!-- 表单区域 -->
    <van-form @submit="onSubmit" class="from">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请填写手机号' },
          {
            pattern:
              /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '手机格式不正确'
          }
        ]"
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
        :rules="[
          { required: true, message: '请填写验证码' },
          {
            pattern: /[0-9]{6}/,
            message: '验证码格式不正确'
          }
        ]"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobile: '',
      code: ''
    }
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values)
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
}
</style>
