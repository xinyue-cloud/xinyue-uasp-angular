/* -----------------------------------------------------------------------------------------------------
 * 用来定义：开始到结束的不同速度过渡效果。
 * cubic-bezier() 函数定义了一个贝塞尔曲线(Cubic Bezier)。
 * 贝塞尔曲线曲线由四个点 P0，P1，P2 和 P3 定义。P0 和 P3 是曲线的起点和终点。
 * P0是（0,0）并且表示初始时间和初始状态，P3是（1,1）并且表示最终时间和最终状态。
 * 参考：https://www.runoob.com/cssref/func-cubic-bezier.html
 ----------------------------------------------------------------------------------------------------- */
export class KuAnimationCurves {
  static STANDARD_CURVE = 'cubic-bezier(0.4, 0.0, 0.2, 1)';
  static DECELERATION_CURVE = 'cubic-bezier(0.0, 0.0, 0.2, 1)';
  static ACCELERATION_CURVE = 'cubic-bezier(0.4, 0.0, 1, 1)';
  static SHARP_CURVE = 'cubic-bezier(0.4, 0.0, 0.6, 1)';
}

/** 定义动画的持续时间 */
export class KuAnimationDurations {
  /** 复杂动作 */
  static COMPLEX = '375ms';
  /** 进入动作 */
  static ENTERING = '225ms';
  /** 离开动作 */
  static EXITING = '195ms';
}
