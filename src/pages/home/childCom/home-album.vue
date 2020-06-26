<template>
  <scroll-view scroll-y class="album-scroll" @scrolltolower="handleToLower">
    <!-- 轮播图 开始 -->
    <view class="album-swiper">
      <swiper indicator-dots autoplay circular>
        <swiper-item v-for="item in banner" :key="item.id">
          <image :src="item.thumb" />
        </swiper-item>
      </swiper>
    </view>
    <!-- 轮播图 结束 -->

    <!-- 列表 开始 -->
    <view class="album-list">
      <navigator class="album-item" v-for="item in albums" :key="item.id" url="/pages/album/album">
        <view class="album-image">
          <image :src="item.cover" mode="aspectFill" />
        </view>
        <view class="album-info">
          <view class="album-name">{{item.name}}</view>
          <view class="album-desc">{{item.desc}}</view>
          <view class="album-btn">
            <view class="album-attention">关注</view>
          </view>
        </view>
      </navigator>
    </view>
    <!-- 列表 结束 -->
  </scroll-view>
</template>

<script>
export default {
  data() {
    return {
      // 请求参数
      alParams: {
        limit: 30,
        skip: 0,
        order: "new"
      },
      // 轮播图
      banner: [],
      // 专辑列表
      albums: [],
      // 是否还有下页
      hasMore: true
    };
  },
  mounted() {
    uni.setNavigationBarTitle({
      title: "专辑"
    });
    this.getAlbumData();
  },
  methods: {
    /**
     * 请求数据
     */
    async getAlbumData() {
      let result = await this.$request({
        url: "https://service.picasso.adesk.com/v1/wallpaper/album",
        data: this.alParams
      });
      if (result.res.album.length === 0) {
        this.hasMore = false;
        return;
      }
      if (this.banner.length === 0) {
        this.banner = result.res.banner;
      }
      this.albums = [this.albums, ...result.res.album];
    },
    /**
     * 下拉加载更多
     */
    handleToLower() {
      if (this.hasMore) {
        this.alParams.skip += this.alParams.limit;
        this.getAlbumData();
      } else {
        uni.showToast({
          title: "我是有底线的",
          icon: "none"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.album-scroll {
  height: calc(100vh - 36px);
}
.album-swiper {
  swiper {
    height: calc(750rpx / 2.3);
    image {
      height: 100%;
    }
  }
}
.album-list {
  padding: 10rpx;
  .album-item {
    padding: 10rpx 0;
    display: flex;
    border-bottom: 1rpx solid #ccc;
    .album-image {
      flex: 1;
      padding: 10rpx;
      image {
        width: 200rpx;
        height: 200rpx;
      }
    }

    .album-info {
      flex: 2;
      padding: 0 10rpx;
      overflow: hidden;
      .album-name {
        font-size: 30rpx;
        color: #000;
        padding: 10rpx 0;
      }

      .album-desc {
        padding: 10rpx 0;
        font-size: 24rpx;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .album-btn {
        padding: 10rpx;
        display: flex;
        justify-content: flex-end;
        .album-attention {
          color: $color;
          border: 1rpx solid currentColor;
          padding: 10rpx;
        }
      }
    }
  }
}
</style>