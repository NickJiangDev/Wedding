App({
  globalData: {
    config: {
      basicInfo: {
        title: "A&J婚礼派对",
        brideName: "新娘姓名",
        groomName: "新郎姓名",
        weddingDate: "婚礼日期",
        weddingTime: "婚礼时间",
        weddingLocation: "婚礼地点",
        receptionLocation: "婚宴地点",
      },
      photos: {
        // coverImage:
        //   "https://www.听闻.cn:5244/d/本地/阿里云盘资料备份共享/图片/图床/2025/02/11/67ab2f2c6464c.jpg",
        coverImage:
          "https://www.听闻.cn:5244/d/本地/阿里云盘资料备份共享/图片/图床/2025/03/06/67c995a70d63a.gif",
        couplePhotos: ["/images/default-couple.png"],
        backgroundImages: ["/images/default-bg.png"],
      },
      invitation: {
        header: "诚挚邀请",
        content: "诚邀您参加我们的婚礼",
        footer: "期待您的光临",
      },
      theme: {
        primaryColor: "#FF6B6B",
        secondaryColor: "#4ECDC4",
        fontFamily: "Microsoft YaHei",
      },
      animation: {
        enablePageTransition: true,
        enableElementAnimation: true,
      },
      music: {
        enable: true,
        src: "https://mp3.itingwa.com/2017-07/22/20170722101716-NTk1NTkx.mp3",
        title: "婚礼背景音乐",
        autoplay: true,
        loop: true,
      },
    },
  },
  onLaunch: function () {
    // 小程序启动时执行的逻辑
    console.log("App launched");

    // 静默检查网络状态，不显示提示
    wx.getNetworkType({
      success: (res) => {
        if (res.networkType === "none") {
          console.log("网络连接不可用");
        }
      },
    });

    // 静默监听网络状态变化
    wx.onNetworkStatusChange((res) => {
      if (!res.isConnected) {
        console.log("网络连接已断开");
      }
    });
  },
});
