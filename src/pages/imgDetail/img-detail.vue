<template>
  <view>
    <!-- 用户信息 开始 -->
    <view class="user-info">
      <view class="user-icon">
        <image :src="imgDetail.user.avatar" mode="widthFix" />
      </view>
      <view class="user-desc">
        <view class="user-name">{{imgDetail.user.name}}</view>
        <view class="user-time">{{imgDetail.cntime}}</view>
      </view>
    </view>
    <!-- 用户信息 结束 -->

    <!-- 高清大图 开始 -->
    <view class="high-img">
      <image :src="imgDetail.newThumb" mode="aspectFill" />
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
    <view class="comment hot">
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
              <view class="user-time">{{item.atime}}</view>
            </view>
            <!-- 徽章 -->
            <view class="user-badge">
              <image :src="badge.icon" mode=""  v-for="badge in item.user.title" :key="badge.icon"/>
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
  </view>
</template>

<script>
import moment from 'moment';
// 切换中文格式
moment.locale('zh-cn')
export default {
  data() {
    return {
      // 图片信息
      imgDetail: {},
      // 专辑数据
      album:[],
      // 最热评论
      hot:[],
      // 最新评论
      comment:[]
    };
  },
  onLoad() {
    const { imgList, imgIndex } = getApp().globalData;
    this.imgDetail = imgList[imgIndex];
    this.imgDetail.newThumb =
      this.imgDetail.thumb + this.imgDetail.rule.replace("$<Height>", 360);
    this.imgDetail.cntime = moment(this.imgDetail.atime * 1000).fromNow()
    this.getComment(this.imgDetail.id)
  },
  methods: {
    /**
     * 获取数据
     */
    async getComment(id){
      let result = await this.$request({
        // url:`http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${id}/comment`,
        url:`https://service.picasso.adesk.com/v2/wallpaper/wallpaper/${id}/comment`
      })
      this.album = result.res.album
      this.hot = result.res.hot
      this.comment = result.res.comment
    }
  },
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
        flex:3;
        padding-left: 20rpx;
        position: relative;
        .album-info-text {
          width: 100rpx;
          height: 50rp;
          color: #fff;
          background-color:$color;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .album-name {
          padding: 10rpx 0;
          color: #888;
        }
        .iconfont{
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
.comment{
  .comment-title{
    padding: 15rpx;
    .iconfont{
      color: red;
      font-size: 40rpx;
    }
    .comment-text{
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
          width: 40rpx;
          height: 40rpx;
        }
      }
    }

    .comment-desc {
      display:flex;
      padding: 30rpx 0;
      .comment-content {
        flex: 1;
        padding-left: 15%;
        color: #000;
      }

      .comment-like {
        text-align: right;
        .iconfont{

        }
      }
    }
  }
}
}
</style>