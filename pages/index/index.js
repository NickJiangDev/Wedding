Page({
  data: {
    imageUrl:
      "https://www.听闻.cn:5244/d/本地/阿里云盘资料备份共享/图片/图床/2025/03/06/67c986e1418b1.jpg",
    // imageUrl:
    //   "https://www.听闻.cn:5244/d/本地/阿里云盘资料备份共享/图片/图床/2025/03/06/67c995a70d63a.gif",
    loading: true,
    error: false,
    // 音乐播放器相关数据
    isPlaying: false,
    animationData: null,
    needUserAction: true,
  },

  onLoad: function () {
    // 页面加载时可以进行一些初始化操作
    wx.showLoading({
      title: "加载图片中...",
    });

    const app = getApp();
    this.setData({
      config: app.globalData.config,
    });

    // 初始化音乐播放器
    this.initMusicPlayer();
  },

  // 初始化音乐播放器
  initMusicPlayer: function () {
    const animation = wx.createAnimation({
      duration: 2000,
      timingFunction: "linear",
    });

    // 创建音频上下文
    this.audioContext = wx.createInnerAudioContext();
    this.audioContext.src = this.data.config.music.src;
    this.audioContext.loop = this.data.config.music.loop;

    // 监听音频播放状态
    this.audioContext.onPlay(() => {
      this.setData({ isPlaying: true });
      this.startRotate(animation);
    });

    this.audioContext.onPause(() => {
      this.setData({ isPlaying: false });
      this.stopRotate();
    });

    this.audioContext.onStop(() => {
      this.setData({ isPlaying: false });
      this.stopRotate();
    });

    this.audioContext.onEnded(() => {
      if (!this.data.config.music.loop) {
        this.setData({ isPlaying: false });
        this.stopRotate();
      }
    });

    this.audioContext.onError((err) => {
      console.error("音频播放错误:", err);
      this.setData({ isPlaying: false });
      this.stopRotate();
    });

    // 尝试自动播放
    if (this.data.config.music.autoplay) {
      // 设置为播放状态
      this.setData({ isPlaying: true });

      // 尝试立即播放
      this.audioContext.play();

      // 由于微信限制，可能需要用户交互才能真正播放
      // 我们可以在 onShow 中再次尝试播放
    }

    this.animation = animation;
  },

  // 切换音乐播放状态
  togglePlay: function () {
    const { isPlaying } = this.data;

    if (this.data.needUserAction) {
      this.setData({ needUserAction: false });
    }

    if (isPlaying) {
      this.audioContext.pause();
    } else {
      this.audioContext.play();
    }

    this.setData({ isPlaying: !isPlaying });
  },

  // 开始旋转动画
  startRotate: function (animation) {
    animation.rotate(360).step();
    this.setData({ animationData: animation.export() });

    this.rotateTimer = setInterval(() => {
      animation.rotate(360).step();
      this.setData({ animationData: animation.export() });
    }, 2000);
  },

  // 停止旋转动画
  stopRotate: function () {
    if (this.rotateTimer) {
      clearInterval(this.rotateTimer);
      this.rotateTimer = null;
    }
  },

  imageLoaded: function (e) {
    // 图片加载成功
    this.setData({
      loading: false,
    });
    wx.hideLoading();
    console.log("图片加载成功", e.detail);
  },

  imageError: function (e) {
    // 图片加载失败
    this.setData({
      loading: false,
      error: true,
    });
    wx.hideLoading();
    console.error("图片加载失败", e.detail);

    // 显示错误提示
    wx.showToast({
      title: "图片加载失败",
      icon: "none",
      duration: 2000,
    });
  },

  // 页面卸载时清理资源
  onUnload: function () {
    if (this.audioContext) {
      this.audioContext.destroy();
    }
    this.stopRotate();
  },

  // 添加 onShow 生命周期函数，再次尝试播放
  onShow: function () {
    // 如果配置为自动播放且当前状态为播放，但可能因为限制没有真正播放
    if (
      this.audioContext &&
      this.data.config &&
      this.data.config.music.autoplay &&
      this.data.isPlaying
    ) {
      // 再次尝试播放
      this.audioContext.play();
    }
  },
});
