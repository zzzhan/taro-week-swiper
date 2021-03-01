import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { WeekSwiper } from '../../components'
import './index.scss'
interface IndexProps {

}
interface IndexProps {
}
interface IndexState {
  [key: string]:any
}
export default class Index extends Component<IndexProps, IndexState> {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onWeekSwiperChange = (day) => {
    this.setState({day})
  }

  render () {
    const { day } = this.state
    return (
      <View className='index'>
        <WeekSwiper onChange={this.onWeekSwiperChange.bind(this)} />
        <Text>Selected Day:{day}</Text>
      </View>
    )
  }
}
