<template>
  <scroll-view
    scroll-y
    class="recommend-view"
    v-if="recommends.length >0"
    @scrolltolower="handleToLower"
  >
    <!-- 推荐 开始 -->
    <view class="recommend-wrap">
      <navigator
        class="recommend-item"
        v-for="item in recommends"
        :key="item.id"
        :url="`/pages/album/album?id=${item.target}`"
      >
        <image :src="item.thumb" mode="widthFix" />
      </navigator>
    </view>
    <!-- 推荐 结束 -->

    <!-- 月份 开始 -->
    <view class="month-wrap">
      <view class="month-title">
        <view class="month-title-info">
          <view class="month-info">
            <text>{{months.DD}} /</text>
            {{months.MM}} 月
          </view>
          <view class="month-text">{{months.title}}</view>
        </view>
        <view class="month-title-more">更多 ></view>
      </view>
      <view class="month-content">
        <view class="month-item" v-for="(item,index) in months.items" :key="item.id">
          <go-detail :list="months.items" :index="index">
            <image :src="item.thumb + item.rule.replace('$<Height>',360)" mode="aspectFill" />
          </go-detail>
        </view>
      </view>
    </view>
    <!-- 月份 结束 -->

    <!-- 热门 开始 -->
    <view class="hots-wrap">
      <view class="hots-title">
        <text>热门</text>
      </view>
      <view class="hots-content">
        <view class="hots-item" v-for="(item,index) in hots" :key="item.id">
          <go-detail :list="hots" :index="index">
            <image :src="item.thumb" mode="widthFix" />
          </go-detail>
        </view>
      </view>
    </view>
    <!-- 热门 结束 -->
  </scroll-view>
</template>

<script>
import moment from "moment";
import goDetail from "@/components/goDetail";
export default {
  components: {
    goDetail
  },
  data() {
    return {
      // 推荐列表
      recommends: [],
      // 月份模块
      months: {},
      // 热门数据
      hots: [],
      // 请求的参数
      reParams: {
        // 获取多少条数据
        limit: 30,
        // 关键词
        order: "hot",
        // 跳过多少条
        skip: 0
      },
      // 是否还有下一页
      hasMore: true
    };
  },
  mounted() {
    uni.setNavigationBarTitle({
      title: "推荐"
    });
    this.getRecommendData();
  },
  methods: {
    /**
     * 获取接口数据
     */
    async getRecommendData() {
      let result = await this.$request({
        url: "http://service.picasso.adesk.com/v3/homepage/vertical",
        data: this.reParams
      });
      // 判断是否还有下一页
      if (result.res.vertical.length === 0) {
        this.hasMore = false;
        return;
      }
      //防止重复请求
      if (this.recommends.length === 0) {
        this.recommends = result.res.homepage[1].items;
        this.months = result.res.homepage[2];
        // 格式化月份
        this.months.MM = moment(this.months.stime).format("MM");
        this.months.DD = moment(this.months.stime).format("DD");
      }
      this.hots = [...this.hots, ...result.res.vertical];
    },
    /**
     * 滚动条触底
     */
    handleToLower() {
      if (this.hasMore) {
        this.reParams.skip += this.reParams.limit;
        this.getRecommendData();
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
.recommend-view {
  height: calc(100vh - 36px);
}
.recommend-wrap {
  display: flex;
  flex-wrap: wrap;
  .recommend-item {
    width: 50%;
    border: 5rpx solid #fff;
    image {
      width: 100%;
    }
  }
}
.month-wrap {
  .month-title {
    display: flex;
    justify-content: space-between;
    padding: 20rpx;
    .month-title-info {
      color: $color;
      font-size: 30rpx;
      font-weight: 600;
      display: flex;
      .month-info {
        text {
          font-size: 36rpx;
        }
      }

      .month-text {
        font-size: 34rpx;
        color: #666;
        margin-left: 30rpx;
      }
    }

    .month-title-more {
      font-size: 24rpx;
      color: $color;
    }
  }

  .month-content {
    display: flex;
    flex-wrap: wrap;
    .month-item {
      width: 33.33%;
      border: 5rpx solid #fff;
    }
  }
}
.hots-wrap {
  .hots-title {
    padding: 20rpx;
    text {
      border-left: 5rpx solid $color;
      font-size: 34rpx;
      padding-left: 20rpx;
      font-weight: 600;
    }
  }

  .hots-content {
    display: flex;
    flex-wrap: wrap;
    .hots-item {
      width: 33%;
      border: 5rpx solid #fff;
    }
  }
}
</style>