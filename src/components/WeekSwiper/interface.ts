
/**
 * WeekSwiper.state 参数类型
 *
 * @export
 * @interface WeekSwiperState
 */
export interface WeekSwiperState {
  selectedDate: string;
  swiperIdx: number;
  dates: string[];
  curStartDate?: string;
}

/**
 * WeekSwiper.props 参数类型
 *
 * @export
 * @interface WeekSwiperProps
 */
export interface WeekSwiperProps {
  onChange?: Function;
  color: string;
  backgroundColor: string;
  date: string;
}
