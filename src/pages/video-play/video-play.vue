<template>
  <view class="video-play">
    <image :src="videoObj.img" />
    <!-- 工具栏 开始 -->
    <view class="video-tools">
      <view @click="handleMuted" :class="['iconfont',muted?'iconjingyin': 'iconshengyin']"></view>
      <view class="iconfont iconzhuanfa">
        <button open-type="share"></button>
      </view>
    </view>
    <!-- 工具栏 结束 -->

    <!-- 视频 开始 -->
    <view class="video-wrap">
      <video :src="videoObj.video" objectFit="fill" :muted="muted"></video>
    </view>
    <!-- 视频 结束 -->

    <!-- 下载 开始 -->
    <view class="download">
      <view class="download-btn" @click="handleDownload">下载高清</view>
    </view>
    <!-- 下载 结束 -->
  </view>
</template>

<script>
export default {
  data() {
    return {
      videoObj: {},
      // 是否静音
      muted: false
    };
  },
  onLoad() {
    this.videoObj = getApp().globalData.video;
  },
  methods: {
    /**
     * 静音
     */
    handleMuted() {
      this.muted = !this.muted;
    },
    /**
     * 下载视频
     */
    async handleDownload() {
      await uni.showLoading({
        title: "加载中"
      });
      const { tempFilePath } = (
        await uni.downloadFile({ url: this.videoObj.video })
      )[1];
      await uni.saveVideoToPhotosAlbum({
        filePath: tempFilePath
      });
      uni.hideLoading();
      await uni.showToast({
        title: "下载成功"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.video-play {
  position: relative;
  image {
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    filter: blur(20px);
  }

  .video-tools {
    height: 80rpx;
    margin-top: 10rpx;
    display: flex;
    justify-content: flex-end;
    .iconfont {
      width: 80rpx;
      color: #fff;
      font-size: 50rpx;
      border-radius: 40rpx;
      background-color: rgba(0, 0, 0, 0.2);
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 20rpx;
    }
    .iconzhuanfa {
      position: relative;
      button {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }
  }

  .video-wrap {
    display: flex;
    justify-content: center;
    video {
      width: 360rpx;
      height: 600rpx;
    }
  }

  .download {
    display: flex;
    justify-content: center;
    margin-top: 30rpx;
    .download-btn {
      width: 360rpx;
      height: 80rpx;
      border-radius: 40rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      border: 1rpx solid #fff;
      background-color: rgba(0, 0, 0, 0.6);
    }
  }
}
</style>