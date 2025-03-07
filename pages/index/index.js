Page({
  data: {
    imageUrl:
      "https://www.听闻.cn:5244/d/本地/阿里云盘资料备份共享/图片/图床/2025/03/07/67cab43bd212e.jpg",
    loading: true,
    error: false,
    imageHeight: 0,
    mapTop: 0, // 添加地图位置数据
    // 音乐播放器相关数据
    isPlaying: false,
    animationData: null,
    needUserAction: true,
    // 地图相关数据
    latitude: 31.224655, // 替换为实际的纬度
    longitude: 121.432177, // 替换为实际的经度
    markers: [
      {
        id: 1,
        latitude: 31.224655, // 替换为实际的纬度
        longitude: 121.432177, // 替换为实际的经度
        name: "和平官邸",
        width: 32,
        height: 32,
        callout: {
          content: "和平官邸",
          color: "#333",
          fontSize: 14,
          borderRadius: 3,
          bgColor: "#f8f0e5",
          padding: 8,
          display: "ALWAYS",
          borderWidth: 1,
          borderColor: "#ddd",
        },
      },
    ],
    showMapActionSheet: false,
    mapScale: 16,
  },

  onLoad: function () {
    // 页面加载时可以进行一些初始化操作
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

    // 设置内部音频播放选项，允许在静音状态下播放
    if (wx.setInnerAudioOption) {
      wx.setInnerAudioOption({
        obeyMuteSwitch: false, // 是否遵循系统静音开关，false表示不遵循
        speakerOn: true, // 是否使用扬声器播放
      });
    }

    // 使用内部音频播放器
    if (this.data.config.music.enable) {
      try {
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

          // 显示错误提示
          wx.showToast({
            title: "音频播放失败",
            icon: "none",
            duration: 2000,
          });
        });

        // 尝试自动播放
        if (this.data.config.music.autoplay) {
          this.setData({ isPlaying: true });
          this.audioContext.play();
        }
      } catch (e) {
        console.error("音频初始化失败:", e);
        wx.showToast({
          title: "音频初始化失败",
          icon: "none",
          duration: 2000,
        });
      }
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
      // 暂停音乐
      if (this.audioContext) {
        this.audioContext.pause();
      }
    } else {
      // 播放音乐
      if (this.audioContext) {
        this.audioContext.play();
      }
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
    // 获取图片高度
    const query = wx.createSelectorQuery();
    query
      .select(".long-image")
      .boundingClientRect((rect) => {
        if (rect) {
          const mapHeight = 300; // 地图高度（rpx）
          const bottomMargin = -50; // 底部间距（rpx）
          // 计算地图应该出现的位置（图片底部）
          const mapTop = rect.height - mapHeight - bottomMargin;
          this.setData({
            imageHeight: rect.height,
            mapTop: mapTop,
            loading: false,
          });
        }
      })
      .exec();
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

  // 页面显示时恢复播放
  onShow: function () {
    // 如果配置为自动播放且当前状态为播放，但可能因为限制没有真正播放
    if (
      this.data.config &&
      this.data.config.music.autoplay &&
      this.data.isPlaying
    ) {
      if (this.audioContext) {
        this.audioContext.play();
      }
    }
  },

  // 页面隐藏时暂停播放
  onHide: function () {
    if (this.audioContext) {
      this.audioContext.pause();
      this.setData({ isPlaying: false });
      this.stopRotate();
    }
  },

  // 打开地图导航选择器
  openMapNavigation: function () {
    const latitude = this.data.latitude;
    const longitude = this.data.longitude;
    const name = "和平官邸";
    this.openSystemMap(latitude, longitude, name);
  },

  // 打开系统导航
  openSystemMap: function (latitude, longitude, name) {
    wx.openLocation({
      latitude,
      longitude,
      name,
      address: name,
      scale: this.data.mapScale,
      success: function () {
        console.log("打开系统导航成功");
      },
      fail: function (error) {
        console.error("打开系统导航失败", error);
        wx.showToast({
          title: "打开导航失败",
          icon: "none",
        });
      },
    });
  },
});
