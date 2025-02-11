const app = getApp();

Page({
  data: {
    config: {},
  },

  onLoad() {
    // 从全局数据中获取配置信息
    this.setData({
      config: app.globalData.config,
    });
  },

  // 预览图片
  previewImage(e) {
    const current = e.currentTarget.dataset.src;
    const urls = this.data.config.photos.couplePhotos;
    wx.previewImage({
      current,
      urls,
    });
  },
});
