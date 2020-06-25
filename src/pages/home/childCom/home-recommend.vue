<template>
  <view>
    <!-- 推荐 开始 -->
    <view class="recommend-wrap">
      <view class="recommend-item" v-for="item in recommends" :key="item.id">
        <image :src="item.thumb" mode="widthFix" />
      </view>
    </view>
    <!-- 推荐 结束 -->

    <!-- 月份 开始 -->
    <view class="month-wrap">
      <view class="month-title"></view>
      <view class="month-content"></view>
    </view>
    <!-- 月份 结束 -->
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 推荐列表
      recommends: []
    };
  },
  async mounted() {
    let result = await this.$request({
      url: "http://service.picasso.adesk.com/v3/homepage/vertical",
      data: {
        // 获取多少条数据
        limit: 30,
        // 关键词
        order: "hot",
        // 跳过多少条
        skip: 0
      }
    });
    this.recommends = result.res.homepage[1].items;
    console.log(this.recommends);
        
  }
};
</script>

<style lang="scss" scoped>
.recommend-wrap{
  display: flex;
  flex-wrap: wrap;
  .recommend-item{
    width: 50%;
    border: 5rpx solid #fff;
    image{
      width: 100%;
    }
  }
}
</style>