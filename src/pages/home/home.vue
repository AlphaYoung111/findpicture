<template>
  <view>
    <view class="home-tab">
      <view class="home-tab-title">
        <view class="title-inner">
          <uni-segmented-control
            :current="current"
            :values="items"
            @clickItem="onClickItem"
            style-type="text"
            active-color="#d4237a"
          ></uni-segmented-control>
        </view>
        <view class="iconfont iconsearch"></view>
      </view>
      <view class="home-tab-content">
        <view v-if="current === 0">
          <home-recommend />
        </view>
        <view v-if="current === 1">
          <home-category />
        </view>
        <view v-if="current === 2">
          <home-new />
        </view>
        <view v-if="current ===3">
          <home-album />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";

import { homeRecommend } from "./childCom/home-recommend";
import { homeCategory } from "./childCom/home-category";
import { homeNew } from "./childCom/home-new";
import { homeAlbum } from "./childCom/home-album";

export default {
  components: {
    uniSegmentedControl,

    homeRecommend,
    homeCategory,
    homeNew,
    homeAlbum
  },
  data() {
    return {
      // 选项卡选项
      items: ["推荐", "分类", "最新", "专辑"],
      // 选中的索引值
      current: 1
    };
  },
  methods: {
    /**
     * 选项卡点击
     */
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.home-tab {
  .home-tab-title {
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
}
</style>