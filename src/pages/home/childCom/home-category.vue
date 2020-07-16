<template>
  <view class="home-category">
    <navigator
      class="cate-item"
      v-for="item in category"
      :key="item.id"
      :url="`/pages/img-category/img-category?id=${item.id}`"
    >
      <image :src="item.cover" mode="aspectFill" />
      <view class="cate-name">{{item.name}}</view>
    </navigator>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 分类数据
      category: []
    };
  },
  mounted() {
    uni.setNavigationBarTitle({
      title: "分类"
    });
    this.getList();
  },
  methods: {
    /**
     * 请求数据
     */
    async getList() {
      let result = await this.$request({
        url: "https://service.picasso.adesk.com/v1/vertical/category"
      });
      this.category = result.res.category;
    }
  }
};
</script>

<style lang="scss" scoped>
.home-category {
  display: flex;
  flex-wrap: wrap;
  .cate-item {
    width: 33.33%;
    position: relative;
    border: 5rpx solid #fff;
    image {
      height: 240rpx;
    }
    .cate-name {
      position: absolute;
      width: 100%;
      height: 50rpx;
      left: 0;
      bottom: 0;
      color: #fff;
      background-image: linear-gradient(
        to right top,
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0)
      );
      font-size: 40rpx;
      display: flex;
      align-items: center;
      padding-left: 20rpx;
    }
  }
}
</style>