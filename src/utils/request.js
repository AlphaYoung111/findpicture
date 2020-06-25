let times = 0
export default (params) => {
  uni.showLoading({
    title: '加载中',
  })
  return new Promise((resolve, reject) => {
    uni.request({
      ...params,
      success: (res) => {
        resolve(res.data)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {
        if (times) {
          times--
        }
        uni.hideLoading();
      }
    });
  }).catch(()=>{})
}