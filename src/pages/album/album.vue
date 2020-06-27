<template>
  <view>
    <!-- 专辑背景 开始 -->
    <view class="album-bg">
      <image :src="album.cover" mode="widthFix" />
      <view class="album-info">
        <view class="album-name">{{album.name}}</view>
        <view class="album-btn">关注专辑</view>
      </view>
    </view>
    <!-- 专辑背景 结束 -->

    <!-- 专辑作者 开始 -->
    <view class="album-author">
      <view class="album-author-info">
        <image :src="album.user.avatar" mode="widthFix" />
        <view class="album-author-name">{{album.user.name}}</view>
      </view>
      <view class="album-author-desc">
        <text>{{album.desc}}</text>
      </view>
    </view>
    <!-- 专辑作者 结束 -->

    <!-- 列表 开始 -->
    <view class="album-list">
      <view class="album-item" v-for="(item,index) in wallpaper" :key="item.id">
        <go-detail :list="wallpaper" :index="index">
          <image :src="item.thumb+item.rule.replace('$<Height>',360)" mode="aspectFill" />
        </go-detail>
      </view>
    </view>
    <!-- 列表 结束 -->
  </view>
</template>

<script>
import goDetail from "@/components/goDetail";
export default {
  components: {
    goDetail
  },
  data() {
    return {
      alParams: {
        limit: 30,
        order: "new",
        skip: 0,
        first: 1
      },
      id: -1,
      // 上方图片
      album: {},
      // 具体图片
      wallpaper: [],
      hasMore: true
    };
  },
  onLoad(options) {
    this.id = options.id;
    this.getDetailData();
  },
  onReachBottom() {
    if (this.hasMore) {
      this.alParams.first === 0;
      this.alParams.skip += this.alParams.limit;
      this.getDetailData();
    } else {
      uni.showToast({
        title: "我是有底线的",
        icon: "none"
      });
    }
  },
  methods: {
    /**
     * 获取数据
     */
    async getDetailData() {
      let result = await this.$request({
        // url: `https://service.picasso.adesk.com/v1/wallpaper/album/${this.id}/wallpaper`,
        url: `http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`,
        data: this.alParams
      });
      if (Object.keys(this.album).length === 0) {
        this.album = result.res.album;
      }
      if (result.res.wallpaper.length === 0) {
        this.hasMore = false;
        return;
      }
      this.wallpaper = [...this.wallpaper, ...result.res.wallpaper];
    }
  }
};
</script>
<style lang="scss" scoped>
.album-bg {
  position: relative;
  image {
  }
  .album-info {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80rpx;
    color: #fff;
    padding: 0 15rpx;
    .album-name {
      font-size: 40rpx;
    }
    .album-btn {
      background-color: $color;
      width: 152rpx;
      height: 50rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10rpx;
    }
  }
}
.album-author {
  padding: 10rpx;
  .album-author-info {
    padding: 10rpx 0;
    display: flex;
    image {
      width: 50rpx;
    }

    .album-author-name {
      color: #000;
      margin-left: 15rpx;
    }
  }

  .album-author-desc {
    padding: 15rpx;
  }
}
.album-list {
  display: flex;
  flex-wrap: wrap;
  .album-item {
    width: 33.33%;
    border: 3rpx solid #fff;
    image {
      height: 164rpx;
      width: 244rpx;
    }
  }
}
</style>