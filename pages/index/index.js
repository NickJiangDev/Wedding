Page({
  data: {
    imageUrl:
      "https://www.听闻.cn:5244/d/本地/阿里云盘资料备份共享/图片/图床/2025/03/06/67c986e1418b1.jpg",
    loading: false,
    error: false,
    // 音乐播放器相关数据
    isPlaying: false,
    animationData: null,
    needUserAction: true,
    // 滚动相关数据
    scrollTop: 0,
    autoScrolling: false,
    scrollSpeed: 0.5, // 滚动速度
    scrollInterval: null, // 滚动定时器
    imageHeight: 0,
    userScrolling: false,
    userScrollTimeout: null,
    resumeScrollTimeout: 3000, // 用户停止滚动后恢复自动滚动的时间（3秒）
    programmaticScroll: false, // 标记是否是程序触发的滚动
    scrollTimer: null, // 自动滚动的定时器
    resumeTimer: null, // 恢复自动滚动的定时器
    lastUserScrollPosition: 0, // 添加新的数据项，记录用户最后滚动位置
    reachedBottom: false, // 添加新的数据项，标记是否已到达底部
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

    // 尝试使用背景音频播放器（在静音模式下有更好的表现）
    if (this.data.config.music.enable) {
      try {
        // 创建背景音频播放器
        const bgAudioManager = wx.getBackgroundAudioManager();
        bgAudioManager.title = this.data.config.music.title;
        bgAudioManager.singer = this.data.config.music.singer;
        bgAudioManager.coverImgUrl = this.data.config.photos.coverImage || "";
        bgAudioManager.src = this.data.config.music.src;
        bgAudioManager.loop = this.data.config.music.loop;

        // 监听背景音频播放状态
        bgAudioManager.onPlay(() => {
          this.setData({ isPlaying: true });
          this.startRotate(animation);
        });

        bgAudioManager.onPause(() => {
          this.setData({ isPlaying: false });
          this.stopRotate();
        });

        bgAudioManager.onStop(() => {
          this.setData({ isPlaying: false });
          this.stopRotate();
        });

        bgAudioManager.onEnded(() => {
          if (!this.data.config.music.loop) {
            this.setData({ isPlaying: false });
            this.stopRotate();
          }
        });

        bgAudioManager.onError((err) => {
          console.error("音频播放错误:", err);
          this.setData({ isPlaying: false });
          this.stopRotate();

          // 如果背景音频播放失败，尝试使用内部音频上下文
          this.fallbackToInnerAudio();
        });

        this.bgAudioManager = bgAudioManager;

        // 尝试自动播放
        if (this.data.config.music.autoplay) {
          this.setData({ isPlaying: true });
          // 背景音频不需要额外调用play()，设置src后会自动播放
        }
      } catch (e) {
        console.error("背景音频初始化失败:", e);
        // 如果背景音频初始化失败，回退到内部音频
        this.fallbackToInnerAudio();
      }
    }

    this.animation = animation;
  },

  // 回退到内部音频播放
  fallbackToInnerAudio: function () {
    console.log("回退到内部音频播放");

    // 创建音频上下文
    this.audioContext = wx.createInnerAudioContext();
    this.audioContext.src = this.data.config.music.src;
    this.audioContext.loop = this.data.config.music.loop;

    // 监听音频播放状态
    this.audioContext.onPlay(() => {
      this.setData({ isPlaying: true });
      this.startRotate(this.animation);
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
      console.error("内部音频播放错误:", err);
      this.setData({ isPlaying: false });
      this.stopRotate();
    });

    // 尝试自动播放
    if (this.data.config.music.autoplay) {
      this.setData({ isPlaying: true });
      this.audioContext.play();
    }
  },

  // 切换音乐播放状态
  togglePlay: function () {
    const { isPlaying } = this.data;

    if (this.data.needUserAction) {
      this.setData({ needUserAction: false });
    }

    if (isPlaying) {
      // 暂停音乐
      if (this.bgAudioManager) {
        this.bgAudioManager.pause();
      } else if (this.audioContext) {
        this.audioContext.pause();
      }
    } else {
      // 播放音乐
      if (this.bgAudioManager) {
        this.bgAudioManager.play();
      } else if (this.audioContext) {
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
    this.setData({
      loading: false,
    });

    // 获取图片高度
    const query = wx.createSelectorQuery();
    query
      .select(".long-image")
      .boundingClientRect((rect) => {
        if (rect && rect.height) {
          const windowInfo = wx.getWindowInfo();

          this.setData({
            imageHeight: rect.height,
          });

          // 只有当图片高度大于窗口高度时才启用自动滚动
          if (rect.height > windowInfo.windowHeight) {
            // 初始化滚动器
            this.initScroller();

            // 延迟0.7秒后开始滚动
            setTimeout(() => {
              console.log("开始自动滚动");
              this.startAutoScroll();
            }, 700);
          } else {
            console.log("图片高度不足以滚动");
          }
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

  // 初始化滚动器
  initScroller: function () {
    // 释放旧的滚动控制器（如果存在）
    if (this.scroller) {
      this.stopAutoScroll();
    }

    // 创建新的滚动控制对象
    this.scroller = {
      // 当前滚动位置
      position: 0,
      // 目标滚动位置（平滑滚动时使用）
      targetPosition: 0,
      // 滚动动画帧请求ID
      animationFrameId: null,
      // 页面参数
      viewHeight: wx.getWindowInfo().windowHeight,
      // 滚动区域总高度
      contentHeight: 0,
      // 是否正在平滑过渡
      transitioning: false,
      // 过渡开始时间
      transitionStartTime: 0,
      // 过渡持续时间（毫秒）
      transitionDuration: 500,
      // 用户是否正在交互
      userInteracting: false,
      // 是否正在自动滚动
      autoScrolling: false,
    };

    // 更新滚动区域参数
    this.updateScrollerDimensions();
  },

  // 更新滚动器尺寸信息
  updateScrollerDimensions: function () {
    if (!this.scroller) return;

    wx.createSelectorQuery()
      .select(".scroll-container")
      .fields({
        size: true,
        scrollOffset: true,
      })
      .exec((res) => {
        if (res[0]) {
          this.scroller.contentHeight = res[0].scrollHeight;
          this.scroller.viewHeight = res[0].height;
          this.scroller.position = res[0].scrollTop;

          // 同步到页面状态
          this.setData({
            scrollTop: this.scroller.position,
          });
        }
      });
  },

  // 开始自动滚动
  startAutoScroll: function () {
    // 如果已经到达底部，不要自动开始滚动
    if (this.data.reachedBottom) {
      return;
    }

    // 确保初始化了滚动器
    if (!this.scroller) {
      this.initScroller();
    }

    // 如果已经在自动滚动中，不要重复启动
    if (this.scroller.autoScrolling) {
      return;
    }

    // 记录当前滚动位置
    this.updateScrollerDimensions();

    // 设置为自动滚动状态
    this.scroller.autoScrolling = true;
    this.setData({
      autoScrolling: true,
    });

    // 启动滚动动画循环
    this.animateScroll();
  },

  // 动画滚动帧
  animateScroll: function () {
    if (!this.scroller || !this.scroller.autoScrolling) return;

    // 检查是否已经到达底部
    if (
      this.scroller.position >=
      this.scroller.contentHeight - this.scroller.viewHeight
    ) {
      this.setData({
        autoScrolling: false,
        reachedBottom: true,
      });
      this.scroller.autoScrolling = false;
      return;
    }

    // 每一帧移动固定像素
    this.scroller.position += 0.5;

    // 设置新的滚动位置
    this.setData({
      scrollTop: this.scroller.position,
    });

    // 请求下一帧
    this.scroller.animationFrameId = setTimeout(() => {
      this.animateScroll();
    }, 16); // 约60fps
  },

  // 平滑过渡到新位置
  smoothScrollTo: function (targetPosition) {
    if (!this.scroller) return;

    // 停止当前所有滚动
    this.stopScrolling();

    // 设置过渡参数
    this.scroller.transitioning = true;
    this.scroller.transitionStartTime = Date.now();
    this.scroller.startPosition = this.scroller.position;
    this.scroller.targetPosition = targetPosition;

    // 开始过渡动画
    this.animateTransition();
  },

  // 执行过渡动画
  animateTransition: function () {
    if (!this.scroller || !this.scroller.transitioning) return;

    const now = Date.now();
    const elapsed = now - this.scroller.transitionStartTime;
    const duration = this.scroller.transitionDuration;

    if (elapsed >= duration) {
      // 过渡结束
      this.scroller.position = this.scroller.targetPosition;
      this.scroller.transitioning = false;

      // 设置最终位置
      this.setData({
        scrollTop: this.scroller.position,
      });
      return;
    }

    // 计算当前过渡位置（使用缓动函数）
    const progress = elapsed / duration;
    const easedProgress = this.easeInOutQuad(progress);
    const startPos = this.scroller.startPosition;
    const endPos = this.scroller.targetPosition;
    const currentPos = startPos + (endPos - startPos) * easedProgress;

    // 更新位置
    this.scroller.position = currentPos;
    this.setData({
      scrollTop: currentPos,
    });

    // 请求下一帧
    setTimeout(() => {
      this.animateTransition();
    }, 16);
  },

  // 缓动函数
  easeInOutQuad: function (t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  },

  // 停止所有滚动
  stopScrolling: function () {
    if (!this.scroller) return;

    // 清除动画帧
    if (this.scroller.animationFrameId) {
      clearTimeout(this.scroller.animationFrameId);
      this.scroller.animationFrameId = null;
    }

    // 重置过渡状态
    this.scroller.transitioning = false;

    // 更新当前位置
    this.updateScrollerDimensions();
  },

  // 用户滚动事件处理
  onScroll: function (e) {
    if (!this.scroller) return;

    // 更新当前位置
    this.scroller.position = e.detail.scrollTop;

    // 如果用户正在交互，记录位置
    if (this.scroller.userInteracting) {
      this.setData({
        lastUserScrollPosition: e.detail.scrollTop,
      });

      // 检查是否从底部往上滚动
      if (
        this.data.reachedBottom &&
        this.scroller.contentHeight -
          this.scroller.viewHeight -
          e.detail.scrollTop >
          100
      ) {
        this.setData({
          reachedBottom: false,
        });
      }
    }
  },

  // 触摸开始事件
  onTouchStart: function () {
    if (!this.scroller) return;

    // 标记用户正在交互
    this.scroller.userInteracting = true;

    // 停止当前所有滚动
    this.stopScrolling();

    // 停止自动滚动
    this.stopAutoScroll();
  },

  // 触摸结束事件
  onTouchEnd: function () {
    if (!this.scroller) return;

    // 移除用户交互标记
    this.scroller.userInteracting = false;

    // 获取并记录当前位置
    this.updateScrollerDimensions();

    // 如果已经到底，不需要恢复滚动
    if (this.data.reachedBottom) return;

    // 设置定时器延迟恢复自动滚动
    if (this.data.resumeTimer) {
      clearTimeout(this.data.resumeTimer);
    }

    const resumeTimer = setTimeout(() => {
      if (!this.scroller.userInteracting && !this.data.reachedBottom) {
        this.startAutoScroll();
      }
    }, this.data.resumeScrollTimeout);

    this.setData({
      resumeTimer: resumeTimer,
    });
  },

  // 停止自动滚动
  stopAutoScroll: function () {
    if (!this.scroller) return;

    // 设置状态
    this.scroller.autoScrolling = false;
    this.setData({
      autoScrolling: false,
    });

    // 停止动画
    this.stopScrolling();
  },

  // 页面卸载时清理资源
  onUnload: function () {
    if (this.audioContext) {
      this.audioContext.destroy();
    }
    // 背景音频管理器不需要手动销毁
    this.stopRotate();

    // 停止自动滚动
    this.stopAutoScroll();

    // 清理滚动器相关资源
    if (this.scroller && this.scroller.animationFrameId) {
      clearTimeout(this.scroller.animationFrameId);
    }

    // 清除用户滚动超时
    if (this.data.userScrollTimeout) {
      clearTimeout(this.data.userScrollTimeout);
    }

    if (this.data.resumeTimer) {
      clearTimeout(this.data.resumeTimer);
    }
  },

  // 页面显示时恢复滚动
  onShow: function () {
    // 如果配置为自动播放且当前状态为播放，但可能因为限制没有真正播放
    if (
      this.data.config &&
      this.data.config.music.autoplay &&
      this.data.isPlaying
    ) {
      if (this.bgAudioManager) {
        this.bgAudioManager.play();
      } else if (this.audioContext) {
        this.audioContext.play();
      }
    }

    // 恢复自动滚动
    if (
      this.data.imageHeight > 0 &&
      !this.data.autoScrolling &&
      !this.data.userScrolling &&
      !this.data.reachedBottom
    ) {
      this.startAutoScroll();
    }
  },

  // 页面隐藏时停止滚动
  onHide: function () {
    // 如果使用的是内部音频上下文，可以选择在页面隐藏时暂停
    // 如果使用的是背景音频，通常希望继续播放
    // 这里我们选择让背景音频继续播放，而内部音频暂停
    if (this.audioContext && !this.bgAudioManager) {
      this.audioContext.pause();
      this.setData({ isPlaying: false });
      this.stopRotate();
    }

    // 停止自动滚动
    this.stopAutoScroll();
  },
});
