export default {
  // 背景音乐配置
  bgm: {
    src: "/statics/music/background.mp3",
    title: "背景音乐",
  },

  // 新郎新娘信息
  couple: {
    groom: "姜杉",
    bride: "陈烨",
    date: "2025年5月25日",
    time: "10:00 AM",
  },

  // 开场欢迎语
  welcome: {
    title: "以爱之名",
    subtitle: "A&J WEDDING PARTY",
    background:
      "https://www.听闻.cn:5244/d/本地/阿里云盘资料备份共享/图片/图床/2025/02/08/67a72e423b179.jpg",
  },

  // 故事内容配置
  stories: [
    {
      title: "Story 1",
      content: "XXXXXXX",
      image:
        "https://www.听闻.cn:5244/d/本地/阿里云盘资料备份共享/图片/图床/2025/02/08/67a72e423b179.jpg",
      layout: "overlap-right",
      imageStyle: "modern-square",
      textStyle: "elegant",
      animation: "fade-in",
    },
    {
      title: "Story 2",
      content: "XXXXXXXXX",
      image:
        "https://www.听闻.cn:5244/d/本地/阿里云盘资料备份共享/图片/图床/2025/02/08/67a72e423b179.jpg",
      layout: "diagonal-split",
      imageStyle: "parallax",
      textStyle: "minimal",
      animation: "slide-up",
    },
    {
      title: "Story 3",
      content: "XXXXXXXXXX",
      image:
        "https://www.听闻.cn:5244/d/本地/阿里云盘资料备份共享/图片/图床/2025/02/08/67a72e423b179.jpg",
      layout: "full-screen-parallax",
      imageStyle: "cinematic",
      textStyle: "overlay",
      animation: "scale-in",
    },
  ],

  // 婚礼信息
  weddingInfo: {
    date: "2024年X月X日 12:00",
    location: {
      name: "幸福大酒店",
      address: "XX市XX区XX路XX号",
      latitude: 30.123456,
      longitude: 120.123456,
    },
  },

  // 结语和祝福
  ending: {
    title: "诚挚邀请",
    content: "我们诚挚地邀请您见证这重要的时刻\n您的祝福是我们最大的幸福",
    background:
      "https://www.听闻.cn:5244/d/本地/阿里云盘资料备份共享/图片/图床/2025/02/08/67a72e423b179.jpg",
  },

  // 图标配置
  icons: {
    music: "/statics/images/icons/music.png",
    location: "/statics/images/icons/location.png",
    arrow: "/statics/images/icons/arrow.png",
  },

  // 动画配置
  animations: {
    "fade-in": {
      duration: 800,
      delay: 200,
    },
    "slide-up": {
      duration: 1000,
      delay: 300,
    },
    "scale-in": {
      duration: 900,
      delay: 250,
    },
  },

  // 样式配置
  theme: {
    primaryColor: "#FF9999",
    secondaryColor: "#FFE6E6",
    fontFamily: "Microsoft YaHei",
    titleSize: "24px",
    contentSize: "16px",
  },

  // 布局配置
  layouts: {
    "overlap-right": {
      imageWidth: "65%",
      textWidth: "50%",
      overlap: "30%",
    },
    "diagonal-split": {
      angle: "45deg",
      ratio: "60/40",
    },
    "full-screen-parallax": {
      scrollSpeed: 0.5,
      textPosition: "center",
    },
  },
};
