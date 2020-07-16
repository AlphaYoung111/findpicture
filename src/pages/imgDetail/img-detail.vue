<template>
  <view>
    <!-- 用户信息 开始 -->
    <view class="user-info">
      <view class="user-icon">
        <image :src="imgDetail.user.avatar" mode="aspectFill" />
      </view>
      <view class="user-desc">
        <view class="user-name">{{imgDetail.user.name}}</view>
        <view class="user-time">{{imgDetail.cntime}}</view>
      </view>
    </view>
    <!-- 用户信息 结束 -->

    <!-- 高清大图 开始 -->
    <view class="high-img">
      <swiper-action @swiperAction="handleSwiperAction">
        <image :src="imgDetail.thumb" mode="aspectFill" />
      </swiper-action>
    </view>
    <!-- 高清大图 结束 -->

    <!-- 点赞 开始 -->
    <view class="user-rank">
      <view class="rank">
        <text class="iconfont icondianzan">{{imgDetail.rank}}</text>
      </view>
      <view class="user-collect">
        <text class="iconfont iconshoucang">收藏</text>
      </view>
    </view>
    <!-- 点赞 结束 -->

    <!-- 专辑 开始 -->
    <view class="album-wrap" v-if="album.length!==0">
      <view class="album-title"></view>
      <view class="album-list">
        <view class="album-item" v-for="item in album" :key="item.id">
          <view class="album-cover">
            <image :src="item.cover" mode="aspectFill" />
          </view>
          <view class="album-info">
            <view class="album-info-text">专辑</view>
            <view class="album-name">{{item.name}}</view>
            <text class="iconfont iconiconfontjiantou4"></text>
          </view>
        </view>
      </view>
    </view>
    <!-- 专辑 结束 -->

    <!-- 最热评论 开始 -->
    <view class="comment hot" v-if="hot.length!==0">
      <view class="comment-title">
        <text class="iconfont iconhot1"></text>
        <text class="comment-text">最热评论</text>
      </view>
      <view class="comment-list">
        <view class="comment-item" v-for="item in hot" :key="item.id">
          <view class="comment-user">
            <!-- 头像 -->
            <view class="user-icon">
              <image :src="item.user.avatar" mode="widthFix" />
            </view>
            <!-- 名称 -->
            <view class="user-name">
              <view class="user-nickname">{{item.user.name}}</view>
              <view class="user-time">{{item.cntime}}</view>
            </view>
            <!-- 徽章 -->
            <view class="user-badge">
              <image :src="badge.icon" mode v-for="badge in item.user.title" :key="badge.icon" />
            </view>
          </view>
          <view class="comment-desc">
            <view class="comment-content">{{item.content}}</view>
            <view class="comment-like">
              <text class="iconfont icondianzan">{{item.size}}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 最热评论 结束 -->

    <!-- 最新评论 开始 -->
    <view class="comment new" v-if="comment.length!==0">
      <view class="comment-title">
        <text class="iconfont iconpinglun"></text>
        <text class="comment-text">最新评论</text>
      </view>
      <view class="comment-list">
        <view class="comment-item" v-for="item in comment" :key="item.id">
          <view class="comment-user">
            <!-- 头像 -->
            <view class="user-icon">
              <image :src="item.user.avatar" mode="widthFix" />
            </view>
            <!-- 名称 -->
            <view class="user-name">
              <view class="user-nickname">{{item.user.name}}</view>
              <view class="user-time">{{item.cntime}}</view>
            </view>
            <!-- 徽章 -->
            <view class="user-badge">
              <image :src="badge.icon" mode v-for="badge in item.user.title" :key="badge.icon" />
            </view>
          </view>
          <view class="comment-desc">
            <view class="comment-content">{{item.content}}</view>
            <view class="comment-like">
              <text class="iconfont icondianzan">{{item.size}}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 最新评论 结束 -->

    <!-- 下载 开始 -->
    <view class="download">
      <view class="download-btn" @click="hanleDownload">下载图片</view>
    </view>
    <!-- 下载 结束 -->
  </view>
</template>

<script>
import moment from "moment";
import swiperAction from "@/components/swiper-action";
// 切换中文格式
moment.locale("zh-cn");
export default {
  components: {
    swiperAction
  },
  data() {
    return {
      // 图片信息
      imgDetail: {},
      // 专辑数据
      album: [],
      // 最热评论
      hot: [],
      // 最新评论
      comment: [],
      // 图片位于传过来说数据的相对索引
      imgIndex: 0,
      arrLength: 0
    };
  },
  onLoad() {
    const { imgIndex } = getApp().globalData;
    this.imgIndex = imgIndex;
    this.initData();
    this.getComment(this.imgDetail.id);
  },
  methods: {
    /**
     * 获取id
     */
    initData() {
      const { imgList } = getApp().globalData;
      this.arrLength = imgList.length;
      this.imgDetail = imgList[this.imgIndex];
      this.imgDetail.cntime = moment(this.imgDetail.atime * 1000).fromNow();
    },
    /**
     * 获取数据
     */
    async getComment(id) {
      let result = await this.$request({
        // url:`http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${id}/comment`,
        url: `https://service.picasso.adesk.com/v2/wallpaper/wallpaper/${id}/comment`
      });
      this.album = result.res.album;
      result.res.hot.forEach(
        v => (v.cntime = moment(v.atime * 1000).fromNow())
      );
      result.res.comment.forEach(
        v => (v.cntime = moment(v.atime * 1000).fromNow())
      );
      this.hot = result.res.hot;
      this.comment = result.res.comment;
    },
    /**
     * 监听手势滑动
     */
    handleSwiperAction(obj) {
      let { direction } = obj;
      if (direction === "right") {
        if (this.imgIndex === 0) {
          uni.showToast({
            title: "左滑试试看",
            icon: "none"
          });
          return;
        }
        this.imgIndex--;
        this.initData();
      } else {
        if (this.imgIndex === this.arrLength - 1) {
          uni.showToast({
            title: "右滑试试看",
            icon: "none"
          });
          return;
        }
        this.imgIndex++;
        this.initData();
      }
    },
    /**
     * 下载图片
     */
    async hanleDownload() {
      await uni.showLoading({
        title: "加载中"
      });
      let result = await uni.downloadFile({
        url: this.imgDetail.img
      });
      const { tempFilePath } = result[1];
      await uni.saveImageToPhotosAlbum({
        filePath: tempFilePath
      });
      uni.hideLoading();
      await uni.showToast({
        title: '下载成功了',
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.user-info {
  display: flex;
  padding: 20rpx;
  .user-icon {
    padding: 0 20rpx;
    image {
      width: 88rpx;
      height: 88rpx;
      border-radius: 50%;
    }
  }

  .user-desc {
    .user-name {
      color: #000;
      font-weight: 600;
    }

    .user-time {
      color: #ccc;
      font-size: 24rpx;
      padding: 10rpx 0;
    }
  }
}
.user-rank {
  display: flex;
  height: 80rpx;
  border-bottom: 5rpx solid #eee;
  .rank {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .iconfont {
    }
  }
  .user-collect {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .iconfont {
    }
  }
}
.album-wrap {
  padding: 20rpx;
  border-bottom: 5rpx solid #ccc;
  .album-title {
    padding: 10rpx 0;
  }

  .album-list {
    .album-item {
      display: flex;
      padding: 10rpx 0;
      .album-cover {
        flex: 1;
        image {
          width: 180rpx;
          height: 180rpx;
        }
      }

      .album-info {
        flex: 3;
        padding-left: 20rpx;
        position: relative;
        .album-info-text {
          width: 100rpx;
          height: 50rp;
          color: #fff;
          background-color: $color;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .album-name {
          padding: 10rpx 0;
          color: #888;
        }
        .iconfont {
          font-size: 40rpx;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 10%;
          color: #000;
        }
      }
    }
  }
}
.comment {
  .comment-title {
    padding: 15rpx;
    .iconfont {
      color: red;
      font-size: 40rpx;
    }
    .comment-text {
      font-weight: 600;
      font-size: 28rpx;
      color: #666;
      margin-left: 10rpx;
    }
  }
  .comment-list {
    .comment-item {
      border-bottom: 15rpx solid #eee;
      .comment-user {
        display: flex;
        padding: 20rpx 0;
        .user-icon {
          width: 15%;
          display: flex;
          justify-content: center;
          align-items: center;
          image {
            width: 90%;
          }
        }

        .user-name {
          flex: 1;
          .user-nickname {
            color: #777;
          }

          .user-time {
            color: #ccc;
            font-size: 24rpx;
            padding: 5rpx 0;
          }
        }

        .user-badge {
          image {
            display: inline-block;
            width: 40rpx;
            height: 40rpx;
          }
        }
      }

      .comment-desc {
        display: flex;
        padding: 30rpx 0;
        .comment-content {
          flex: 1;
          padding-left: 15%;
          color: #000;
        }

        .comment-like {
          text-align: right;
          .iconfont {
          }
        }
      }
    }
  }
}
// 最新
.new {
  .iconpinglun {
    color: aqua !important;
  }
}
// 高清大图
.high-img {
  image {
    border-bottom: 1rpx solid #eee;
    width: 750rpx;
    height: 360rpx;
  }
}
// 下载
.download {
  margin-top: 15rpx;
  height: 120rpx;
  padding: 8rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  .download-btn {
    width: 90%;
    height: 80%;
    background-color: $color;
    color: #fff;
    font-size: 50rpx;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>