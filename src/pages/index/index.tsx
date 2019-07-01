import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { IndexState, IndexProps } from './interface'
import { WeekSwiper }  from '../../components'
import moment from "moment"

export default class Index extends Component<IndexProps,IndexState> {

  constructor(props: IndexProps) {
    super(props);
  }
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onDayChange(selectedDate) {
    this.setState({selectedDate})
  }

  render () {
    const { selectedDate } = this.state

    return (
      <View className='index'>
        <WeekSwiper onChange={this.onDayChange.bind(this)} backgroundColor="#ed3f14"></WeekSwiper>
        <Text>{moment(selectedDate).format('[当前日期:]YYYY-MM-DD')}</Text>
      </View>
    )
  }
}
