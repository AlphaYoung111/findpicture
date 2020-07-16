<template>
  <view>
    <view class="cate-tab">
      <view class="cate-tab-title">
        <view class="title-inner">
          <uni-segmented-control
            :current="current"
            :values="items.map(v=>v.title)"
            @clickItem="onClickItem"
            style-type="text"
            active-color="#d4237a"
          ></uni-segmented-control>
        </view>
        <view class="iconfont iconsearch"></view>
      </view>
      <scroll-view
        scroll-y
        enable-flex
        class="cate-tab-content"
        @scrolltolower="handleScrolltolower"
      >
        <!-- 不使用-v-if.只是将选项卡的激活的效果显示出来，其实是同一个页面进行再次刷新渲染 -->
        <view class="cate-item" v-for="item in vertical" :key="item.id">
          <image :src="item.thumb" mode="aspectFill" />
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";
export default {
  components: {
    uniSegmentedControl
  },
  data() {
    return {
      // 选项卡选项
      items: [
        { title: "最新", order: "new" },
        { title: "热门", order: "hot" }
      ],
      // 选中的索引值
      current: 0,
      caParams: {
        limit: 30,
        skip: 0,
        order: "new"
      },
      id: 0,
      // 页面展示的
      vertical: [],
      hasMore: true
    };
  },
  onLoad(options) {
    this.id = options.id;
    this.getList();
  },
  methods: {
    /**
     * 选项卡
     */
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }else{
        // 如果点击的是相同的就不会发送新请求
        return 
      }
      this.caParams.order = this.items[e.currentIndex].order;
      this.caParams.skip = 0;
      this.vertical =[]
      this.getList();
    },
    /**
     * 请求数据
     */
    async getList() {
      let result = await this.$request({
        url: `https://service.picasso.adesk.com/v1/vertical/category/${this.id}/vertical`,
        data: this.caParams
      });
      if (result.res.vertical.length === 0) {
        this.hasMore = false;
        uni.showToast({
          title: "没有更多数据了",
          icon: "none"
        });
        return;
      }
      this.vertical = [this.vertical, ...result.res.vertical];
    },
    /**
     * 下拉加载更多
     */
    handleScrolltolower() {
      if (this.hasMore) {
        this.caParams.skip += this.caParams.limit;
        this.getList();
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
.cate-tab {
  .cate-tab-title {
    position: relative;
    .title-inner {
      width: 60%;
      margin: 0 auto;
    }
    .iconsearch {
      position: absolute;
      top: 50%;
      right: 5%;
      transform: translateY(-50%);
    }
  }
  .cate-tab-content {
    display: flex;
    flex-wrap: wrap;
    height: calc(100vh - 36px);
    .cate-item {
      width: 33.33%;
      border: 5rpx solid #fff;
      image {
        height: 372rpx;
      }
    }
  }
}
</style>