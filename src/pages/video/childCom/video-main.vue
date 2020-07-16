<template>
  <scroll-view scroll-y @scrolltolower="handleScrolltolower" enable-flex class="video-main">
    <view class="video-item" v-for="item in videowp" :key="item.id" @click="handleGoVideo(item)">
      <image :src="item.img" mode="widthFix" />
    </view>
  </scroll-view>
</template>

<script>
export default {
  props: {
    urlobj: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      //数据
      videowp: [],
      hasMore: true
    };
  },
  watch: {
    urlobj() {
      this.videowp = [];
      this.getList();
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    /**
     * 获取数据
     */
    async getList() {
      let result = await this.$request({
        url: this.urlobj.url,
        data: this.urlobj.params
      });
      if (result.res.videowp.length === 0) {
        this.hasMore = false;
        uni.showToast({
          title: "没有数据了",
          icon: "none"
        });
        return;
      }
      this.videowp = [...this.videowp, ...result.res.videowp];
    },
    /**
     * 加载更多数据
     */
    handleScrolltolower() {
      if (this.hasMore) {
        this.urlobj.params.skip += this.urlobj.params.limit;
        this.getList();
      } else {
        uni.showToast({
          title: "没有数据了",
          icon: "none"
        });
      }
    },
    /**
     * 前往视频详情
     */
    handleGoVideo(item) {
      getApp().globalData.video = item;
      uni.navigateTo({
        url: "/pages/video-play/video-play"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.video-main {
  display: flex;
  flex-wrap: wrap;
  height: calc(100vh - 36px);
  .video-item {
    width: 33.33%;
    border: 5rpx solid #fff;
    image {
    }
  }
}
</style>