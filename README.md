Taro Week Swiper
=========

> 基于Taro开发，按星期(每周)切换, 用于日期选择的小程序组件

## 演示

![Week Swiper](https://ws2.sinaimg.cn/large/ab71ac88gy1g4kjoo7ltfj20hq0tumzg.jpg)

## Feature

* 支持右左滑动切换星期
* 支持设置字体和背景颜色

## Getting Started

### Install

```
yarn add taro-week-swiper
# or
npm i taro-week-swiper --save
```

### Usage

```jsx
import Taro from '@tarojs/taro'
import { WeekSwiper } from 'taro-week-swiper'

class Code extends Taro.Component {
  constructor (props) {
    super(props)
    this.state = {selectedDate: ''}
  }
  onDayChange(selectedDate) {
    this.setState({selectedDate})
  }
  render () {
    const { selectedDate } = this.state
    return (
      <View className='index'>
        <WeekSwiper onChange={this.onDayChange.bind(this)}></WeekSwiper>
        <Text>选择日期:{selectedDate}</Text>
      </View>
    )
  }
}
```

### 参数

| 参数                       | 说明           | 类型    | 可选值 | 默认值  |
| :------------------------- | :------------- | :------ | :----- | :------ |
| date                 | 日期,格式为: YYYY-MM-DD       | String  | Yes      | 当天      | 
| backgroundColor                      | 背景色       | String  | Yes      | #19be6b       |
| color                      | 字体颜色       | String  | Yes      | #fff |

### 事件

| 事件名称 | 说明             | 返回参数   |
| :------- | :--------------- | :--------- |
| onChange   | 日期选择事件   | 日期字符串,格式为: YYYY-MM-DD |

### 注意

目前只在微信小程序测试，其他平台未测试