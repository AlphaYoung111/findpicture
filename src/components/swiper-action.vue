<template>
  <view @touchstart="handleTouchStart" @touchend="handleTouchEnd">
    <slot></slot>
  </view>
</template>

<script>
export default {
  data() {
    return {
      startTime: 0,
      startX: 0,
      startY: 0
    };
  },
  methods: {
    handleTouchStart(e) {
      this.startTime = Date.now();
      this.startX = e.changedTouches[0].clientX;
      this.startY = e.changedTouches[0].clientY;
    },
    handleTouchEnd(e) {
      const endTime = Date.now();
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      // 判断按下的时长
      if (endTime - this.startTime > 2000) {
        return;
      }
      // 先判断滑动距离是否足够
      let direction = "";
      //为了防止上下滑动产生的左右偏移，影响左右手势，需要加上Y轴的判断
      if (
        Math.abs(endX - this.startX) > 10 &&
        Math.abs(endY - this.startY) < 10
      ) {
        direction = endX - this.startX > 0 ? "right" : "left";
      } else {
        return;
      }
      this.$emit("swiperAction", { direction });
    }
  }
};
</script>

<style>
</style>