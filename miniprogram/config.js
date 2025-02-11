// 婚礼请柬配置文件
module.exports = {
  // 基本信息
  basicInfo: {
    title: "A & J 以爱之名",
    brideName: "陈烨",
    groomName: "姜杉",
    weddingDate: "2025年5月25日",
    weddingTime: "10:00",
    weddingLocation: "和平官邸",
    receptionLocation: "和平官邸",
  },

  // 照片配置
  photos: {
    coverImage:
      "https://www.听闻.cn:5244/d/本地/阿里云盘资料备份共享/图片/图床/2025/02/08/67a72e423b179.jpg",
    couplePhotos: [
      "/images/default-couple.png", // 封面照片
      "/images/default-couple.png", // 故事页照片
    ],
    backgroundImages: ["/images/default-bg.png"],
  },

  // 邀请函文字
  invitation: {
    header: "hi~亲爱的你~",
    content: `当收到这封请柬的时候
我们的婚礼已经在倒计时啦~

以前觉得婚礼是一则官方公告
现在才明白
这是一场为数不多的相聚
是千里迢迢的奔赴
是不计得失的支持`,
    footer: "好久不见，婚礼见",
  },

  // 故事页配置
  story: {
    header: "想把我的另一半介绍给你",
    birthDates: {
      groom: "1995.6.29",
      bride: "1997.11.30",
    },
    content: `出生时的月亮
Random luck in universe
宇宙间相遇的浪漫`,
    photoCaption: `他有最真的笑容
细腻的心思
我一百分的男孩`,
    loveQuote: `我常常觉得也许这辈子
不会得到所谓的爱情了
直到
你出现了`,
  },

  // 结语配置
  ending: {
    title: "致珍贵的你们",
    content: `人的一生有三万多天
很开心这一天
你专为我们而来
请准备好你的好心情和好胃口
来奔赴这场冬日的聚会叭~`,
  },

  // 联系方式
  contact: {
    groomPhone: "",
    bridePhone: "",
    groomParentsPhone: "",
    brideParentsPhone: "",
  },

  // 主题配置
  theme: {
    primaryColor: "#e60012", // 红色主题色
    secondaryColor: "#333333", // 文字主色
    fontFamily: "Microsoft YaHei",
  },

  // 动画配置
  animation: {
    enablePageTransition: true,
    enableElementAnimation: true,
  },
};
