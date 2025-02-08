import config from "../../config";

Page({
  data: {
    config: config,
    isPlaying: false,
    showWelcome: false,
    welcomeFullscreen: true,
    showWeddingInfo: false,
    showEnding: false,
    markers: [
      {
        id: 1,
        latitude: config.weddingInfo.location.latitude,
        longitude: config.weddingInfo.location.longitude,
        name: config.weddingInfo.location.name,
        callout: {
          content: config.weddingInfo.location.name,
          color: "#000000",
          fontSize: 14,
          borderRadius: 4,
          padding: 8,
          display: "ALWAYS",
        },
      },
    ],
  },

  onLoad: function () {
    // 初始化音频上下文
    this.audioCtx = wx.createAudioContext("bgm");

    // 显示欢迎页
    setTimeout(() => {
      this.setData({
        showWelcome: true,
      });
    }, 500);

    // 初始化故事单元的显示状态
    const stories = this.data.config.stories.map((story) => ({
      ...story,
      show: false,
    }));
    this.setData({
      "config.stories": stories,
    });

    // 3秒后自动隐藏欢迎页
    setTimeout(() => {
      this.hideWelcome();
    }, 3000);
  },

  // 添加隐藏欢迎页的方法
  hideWelcome: function () {
    // 隐藏欢迎页的同时显示第一个故事
    const stories = this.data.config.stories.map((story, index) => ({
      ...story,
      show: index === 0, // 只显示第一个故事
    }));

    this.setData({
      welcomeFullscreen: false,
      "config.stories": stories,
      showWeddingInfo: true, // 同时显示婚礼信息
    });

    // 延迟一点显示结语部分，营造渐进效果
    setTimeout(() => {
      this.setData({
        showEnding: true,
      });
    }, 800);
  },

  // 点击欢迎页时触发
  handleWelcomeClick: function () {
    this.hideWelcome();
  },

  onShow: function () {
    // 自动播放背景音乐
    this.audioCtx.play();
    this.setData({
      isPlaying: true,
    });
  },

  toggleMusic: function () {
    if (this.data.isPlaying) {
      this.audioCtx.pause();
    } else {
      this.audioCtx.play();
    }
    this.setData({
      isPlaying: !this.data.isPlaying,
    });
  },

  onScroll: function (e) {
    // 获取页面高度
    const query = wx.createSelectorQuery();
    query.select(".story-container").boundingClientRect();
    query.selectAll(".story-unit").boundingClientRect();

    query.exec((res) => {
      const scrollTop = e.detail.scrollTop;
      const windowHeight = res[0].height;

      // 检查每个故事单元是否应该显示
      res[1].forEach((item, index) => {
        if (
          item.top <= windowHeight * 0.8 &&
          !this.data.config.stories[index].show
        ) {
          const key = `config.stories[${index}].show`;
          this.setData({
            [key]: true,
          });
        }
      });
    });
  },

  // 点击地图标记时的处理函数
  markertap: function () {
    const location = this.data.config.weddingInfo.location;
    wx.openLocation({
      latitude: location.latitude,
      longitude: location.longitude,
      name: location.name,
      address: location.address,
      scale: 18,
    });
  },
});
