<template>
  <view @click="handleClick">
    <slot></slot>
  </view>
</template>

<script>
export default {
  props:{
    index:{
      type:Number,
      default:0
    },
    list:{
      type:Array,
      default:()=>[]
    }
  },
  methods: {
    /**
     * 跳转图片详情
     */
    handleClick(){
      getApp().globalData.imgList = this.list
      getApp().globalData.imgIndex = this.index
      uni.navigateTo({
         url: '/pages/imgDetail/img-detail'
      });
    }
  },
}
</script>

<style>

</style>