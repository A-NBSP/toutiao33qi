<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell title="我的频道">
      <van-button
        class="btn"
        size="mini"
        round
        @click="isEdit = !isEdit"
        style="color: red; border-color: red"
        >{{ !isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <div class="my-pannel">
      <van-grid gutter="10" :border="false">
        <van-grid-item
          :class="{ active: item.name === '推荐' }"
          v-for="(item, index) in mychannels"
          :key="item.id"
          :icon="isEdit && item.name !== '推荐' ? 'cross' : ''"
          :text="item.name"
          @click="handleMyChannel(item, index)"
        >
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 推荐频道 -->
    <van-cell title="推荐频道"></van-cell>
    <div class="recommend-pannel">
      <van-grid gutter="10" :border="false">
        <van-grid-item
          v-for="item in recommendChannels"
          :key="item.id"
          :text="item.name"
          icon="plus"
        >
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannelsAPI } from '@/api'
export default {
  props: {
    mychannels: {
      type: Array
    }
  },
  data() {
    return {
      isEdit: false, // 编辑还是完成状态
      allChannels: []
    }
  },
  created() {
    this.getAllChannels()
  },
  computed: {
    recommendChannels() {
      return this.allChannels.filter((allChannelsItem) => {
        return !this.mychannels.find((mychannelsItem) => {
          return mychannelsItem.id === allChannelsItem.id
        })
      })
    }
  },
  methods: {
    async getAllChannels() {
      const { data } = await getAllChannelsAPI()
      this.allChannels = data.data.channels
      console.log(data)
    },
    handleMyChannel({ name }, index) {
      if (this.isEdit && name !== '推荐') {
        console.log('删除频道', name)
      } else {
        // 关闭弹窗
        // 切换频道
        // index与home中active应是一一对应
        this.$emit('change-active', index)
      }
    }
  }
}
</script>

<style scoped lang="less">
/deep/.active {
  .van-grid-item__text {
    color: red;
  }
}
.channel-edit {
  padding-top: 92px;
}
:deep(.btn) {
  width: 100px;
  font-size: 25px;
}
:deep(.van-grid-item__content) {
  background-color: #f4f5f6;
}
// 我的频道
.my-pannel {
  // 编辑按钮居中
  .van-cell__value {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  // 关闭按钮样式
  :deep(.van-grid-item__content) {
    position: relative;

    .van-grid-item__content {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
:deep(.van-icon-cross) {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 25px;
  transform: translate(20%, -35%);
  border: 0.02667rem solid #000;
  // box-sizing: border-box;
  border-radius: 50%;
  text-align: center;
  line-height: 0.32rem;
}
// 推荐频道
.recommend-pannel {
  // 推荐频道加号样式
  :deep(.van-grid-item__content) {
    flex-direction: row;

    .van-grid-item__icon {
      font-size: 0.5rem;
    }

    .van-grid-item__text {
      margin-top: 0;
    }
  }
}
</style>
