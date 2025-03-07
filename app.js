App({
  globalData: {
    config: {
      basicInfo: {
        title: "A&C's Wedding Invitation",
        brideName: "A",
        groomName: "C",
        weddingDate: "2025-05-25",
        weddingTime: "10:30",
        weddingLocation: "The Ritz Carlton",
        receptionLocation: "The Ritz Carlton",
      },
      photos: {
        coverImage:
          "https://img2.kuwo.cn/star/starheads/500/47/14/4224449251.jpg",
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
        src: "https://rf-sycdn.kuwo.cn/f469a55ffece6f529a65f3ed63ed87e7/67ca8ddf/resource/n2/98/17/53766695.mp3",
        title: "本気でオンリーユー (Let'S Get Married)",
        singer: "竹内まりや",
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
