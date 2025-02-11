const config = require("./config");

App({
  globalData: {
    config: config || {
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
        coverImage:
          "https://www.听闻.cn:5244/d/本地/阿里云盘资料备份共享/图片/图床/2025/02/11/67ab2f2c6464c.jpg",
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
    },
  },
  onLaunch() {
    // 小程序启动时执行
  },
});
