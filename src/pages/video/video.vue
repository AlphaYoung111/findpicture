<template>
  <view>
    <view class="video-tab">
      <view class="video-tab-title">
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
      <view class="video-tab-content">
        <view v-if="current<4">
          <video-main :urlobj="{url:items[current].url,params:items[current].params}"></video-main>
        </view>
        <view v-if="current===4">
          <video-category></video-category>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";
import videoMain from "./childCom/video-main";
import videoCategory from "./childCom/video-category";
export default {
  components: {
    uniSegmentedControl,

    videoMain,
    videoCategory
  },
  data() {
    return {
      items: [
        { title: "推荐",url:'http://157.122.54.189:9088/videoimg/v1/videowp/featured',params:{limit:30,skip:0,order:'hot'}},
        { title: "娱乐" ,url:'http://157.122.54.189:9088/videoimg/v1/videowp/category/59b25abbe7bce76bc834198a',params:{limit:30,skip:0,order:'new'}},
        { title: "最新" ,url:'http://157.122.54.189:9088/videoimg/v1/videowp/videowp',params:{limit:30,skip:0,order:'new'}},
        { title: "热门" ,url:'http://157.122.54.189:9088/videoimg/v1/videowp/videowp',params:{limit:30,skip:0,order:'hot'}},
        { title: "分类" ,url:'http://157.122.54.189:9088/videoimg/v1/videowp/category',params:{}}
      ],
      current: 0
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
.video-tab {
  .video-tab-title {
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