import Taro, { Component } from "@tarojs/taro"
import { View, Swiper, SwiperItem } from "@tarojs/components"
import moment from "moment"
import { WeekSwiperProps, WeekSwiperState } from "./interface"
import "./index.scss"
export class WeekSwiper extends Component<WeekSwiperProps, WeekSwiperState> {
  constructor(props: WeekSwiperProps) {
    super(props);
    this.state = {
      selectedDate: this.props.date,
      dates: [],
      swiperIdx: 1
    }
  }
  static options = {
    addGlobalClass: true
  };
  static defaultProps: WeekSwiperProps = {
    backgroundColor: '#19be6b',
    color: '#fff',
    date: moment().format("YYYY-MM-DD")
  }

  componentWillMount() {
    const { selectedDate } = this.state
    this.dayChange(selectedDate)
  }

  dayChange(date) {
    const { onChange } = this.props
    let momentObj = moment(date)
    const selectedDay = momentObj.weekday()
    momentObj.subtract(selectedDay, "days")
    const curStartDate = momentObj.format("YYYY-MM-DD")
    let dates = [momentObj.subtract(7, "days").format("YYYY-MM-DD")]
    for (let i = 0; i < 20; i++) {
      dates[dates.length] = momentObj.add(1, "days").format("YYYY-MM-DD")
    }
    this.setState({ dates, swiperIdx: 1, curStartDate })
    if (!!onChange) {
      onChange(date)
    }
  }

  onSwiperChange(e) {
    let { swiperIdx, curStartDate, dates, selectedDate } = this.state
    const { onChange } = this.props
    const oIndex = e.detail.current
    let ind = oIndex - swiperIdx
    let curDate = moment(curStartDate)
    const weekDay = moment(selectedDate).weekday()
    let updated = false
    //向左滑动
    if (ind === 1 || ind === -2) {
      const dateArr = [] as string[]
      curDate.add(13, "days")
      const j = oIndex + 1 === 3 ? 0 : (oIndex + 1) * 7
      for (let i = 0; i < 7; i++) {
        dateArr[dateArr.length] = curDate.add(1, "days").format("YYYY-MM-DD")
      }
      dates.splice(j, 7, ...dateArr)
      selectedDate = dates[oIndex * 7 + weekDay]
      this.setState({
        dates,
        swiperIdx: oIndex,
        curStartDate: moment(curStartDate)
          .add(7, "days")
          .format("YYYY-MM-DD"),
        selectedDate
      });
      updated = true
    }
    //向右滑动
    if (ind === -1 || ind === 2) {
      const dateArr = [] as string[]
      curDate.subtract(15, "days")
      for (let i = 0; i < 7; i++) {
        dateArr[dateArr.length] = curDate.add(1, "days").format("YYYY-MM-DD")
      }
      dates.splice((oIndex - 1 === -1 ? 2 : oIndex - 1) * 7, 7, ...dateArr)
      selectedDate = dates[oIndex * 7 + weekDay]
      this.setState({
        dates,
        swiperIdx: oIndex,
        curStartDate: moment(curStartDate)
          .subtract(7, "days")
          .format("YYYY-MM-DD"),
        selectedDate
      });
      updated = true
    }
    if (!updated) {
      selectedDate = dates[oIndex * 7 + weekDay]
      this.setState({ selectedDate })
    }
    if (!!onChange) {
      onChange(selectedDate)
    }
  }

  clickDay = day => {
    const { onChange } = this.props
    this.setState({ selectedDate: day })
    if (!!onChange) {
      onChange(day)
    }
  };

  render() {
    const  {backgroundColor, color } = this.props
    const { dates, swiperIdx, selectedDate } = this.state
    const format = val => {
      if (val === selectedDate) {
        const diff = moment().startOf('day').diff(selectedDate, 'days')
        let ret = ''
        switch(diff) {
          case 0:
          ret = '今'
          break
          case 1: 
          ret = '昨'
          break
          case -1:
          ret = '明'
          break;
          default:
          ret = moment(val).format("M/D")
          break
        }
        return ret
      } else {
        return moment(val).format('DD')
      }
    }
    return (
      <View className="WeekSwiper-wrap" style={{backgroundColor: backgroundColor, color: color}}>
        <View className="WeekSwiper-row">
          {Array.from(Array(7).keys()).map(i => {
            const weekText = moment.weekdaysShort(true, i)
            const ind = weekText.indexOf('周')
            return <View key={i}>{ind === -1 ? weekText : weekText.substr(1)}</View>
          })}
        </View>
        <Swiper
          className="WeekSwiper-swiper"
          onChange={this.onSwiperChange}
          current={swiperIdx}
          circular
        >
          <SwiperItem>
            <View className="WeekSwiper-row WeekSwiper-day">
              {dates.slice(0, 7).map(val => (
                <View
                  key={val}
                  onClick={this.clickDay.bind(this, val)}
                  className={
                    val === selectedDate ? "WeekSwiper-day-selected" : ""
                  } 
                  style={val === selectedDate ? {backgroundColor: color, color: backgroundColor} : undefined}
                >
                  {format(val)}
                </View>
              ))}
            </View>
          </SwiperItem>
          <SwiperItem>
            <View className="WeekSwiper-row">
              {dates.slice(7, 14).map(val => (
                <View
                  key={val}
                  onClick={this.clickDay.bind(this, val)}
                  className={
                    val === selectedDate ? "WeekSwiper-day-selected" : ""
                  }
                  style={val === selectedDate ? {backgroundColor: color, color: backgroundColor} : undefined}
                >
                  {format(val)}
                </View>
              ))}
            </View>
          </SwiperItem>
          <SwiperItem>
            <View className="WeekSwiper-row">
              {dates.slice(14, 21).map(val => (
                <View
                  key={val}
                  onClick={this.clickDay.bind(this, val)}
                  className={
                    val === selectedDate ? "WeekSwiper-day-selected" : ""
                  }
                  style={val === selectedDate ? {backgroundColor: color, color: backgroundColor} : undefined}
                >
                  {format(val)}
                </View>
              ))}
            </View>
          </SwiperItem>
        </Swiper>
      </View>
    );
  }
}