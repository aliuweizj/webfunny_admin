import "./index.scss"
import React, { Component } from "react"
import Header from "Components/header"
import ChartFactory from "Components/chartFactory"
import SvgIcons from "Components/svg_icons"
import { jsErrorOptionByHour } from "ChartConfig/jsChartOption"
import { resourceErrorOption } from "ChartConfig/resourceChartOption"
import { Spin, Tabs, Icon, notification } from "antd"
import utils from "Common/utils"
const TabPane = Tabs.TabPane
export default class Home extends Component {
  constructor(props) {
    super(props)
    this.initData.bind(this)
  }

  componentDidMount() {
    // 冬天飘雪花
    const canvas = document.querySelector("#snowCanvas")
    this.snow(canvas)
    this.openNotification()
  }

  openNotification() {
    const key = `open${Date.now()}`
    notification.open({
      message: "更新提示（2019-04-20）",
      description: <p className="update-box">
          <span>1. JS报错分析中增加日期联动功能，点击柱状图可以查看每一天的js报错详情，以便对比出BUG修正的效果；</span> <br/>
          <span>2. JS实时报错时间段由当天24小时调整为向前推算24小时；</span><br/>
          <span>3. 增加了行为检索中一些细节的展示，以区分用户多台机器登录的情况；</span><br/>
          <hr/>
          <label>1. 将增加首页接口报错实时统计；</label><br/>
          <label>2. 将完善静态资源错误统计和分析功能；</label>
      </p>,
      style: {
        width: 400,
        marginTop: 50,
      },
      duration: 20,
      key
    })
  }
  render() {
    const { jsErrorTotalCount, jsErrorByHourChart, resourceErrorTotalCount, resourceErrorByDayChart } = this.props
    return <div className="home-container">
      <canvas className="snow-canvas" id="snowCanvas" />
      <Header
        chooseProject={this.choseProject.bind(this)}
        loadedProjects={this.loadedProjects.bind(this)}
        parentProps={this.props}
      />
      <div className="home-mask">
        <div className="home-content">
          <div className="left">
            <Tabs>
              <TabPane tab={<span><Icon type="line-chart" />Js报错实时监控（{jsErrorTotalCount}）</span>} key="1">
                {
                  jsErrorByHourChart ?
                    <ChartFactory
                      style={{ height: 320, paddingBottom: 20 }}
                      option={jsErrorByHourChart}
                    />
                    :
                    <div className="chart-loading">
                      <Spin tip="Loading..."/>
                    </div>
                }
              </TabPane>
              <TabPane tab={<span><Icon type="file-text" />静态资源加载报错（{resourceErrorTotalCount}）</span>} key="2">
                {
                  resourceErrorByDayChart ?
                    <ChartFactory
                      style={{ height: 320, paddingBottom: 20 }}
                      option={resourceErrorByDayChart}
                    />
                    :
                    <div className="chart-loading">
                      <Spin tip="Loading..."/>
                    </div>
                }
              </TabPane>
              <TabPane tab={<span><Icon component={SvgIcons.RequestSvg} />接口请求报错（待发布）</span>} key="3">
                {
                  <div className="chart-loading">
                    <Spin tip="Loading..."/>
                  </div>
                }
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  }
  initData() {
    const hours = utils.get24HoursArray().reverse()
    const sevenHours = utils.getSevenDaysAgo24HoursArray().reverse()
    this.props.getJsErrorCountByHourAction((res) => {
      const data = res.data.today
      const dateArray = [], jsErrorArray = []
      let jsErrorTotalCount = 0
      for (let i = 0; i < hours.length; i ++) {
        if (data[i] && data[i].hour === hours[i]) {
          dateArray.push(data[i].hour + "时")
          jsErrorArray.push(data[i].count)
          jsErrorTotalCount = jsErrorTotalCount + parseInt(data[i].count, 10)
        } else {
          dateArray.push(hours[i] + "时")
          jsErrorArray.push(0)
        }
      }
      const seven = res.data.seven
      const sevenDateArray = [], sevenJsErrorArray = []
      for (let i = 0; i < sevenHours.length; i ++) {
        if (seven[i] && seven[i].hour === sevenHours[i]) {
          sevenDateArray.push(seven[i].hour + "时")
          sevenJsErrorArray.push(seven[i].count)
        } else {
          sevenDateArray.push(sevenHours[i] + "时")
          sevenJsErrorArray.push(0)
        }
      }
      this.props.updateHomeState({jsErrorTotalCount, jsErrorByHourChart: jsErrorOptionByHour([dateArray, jsErrorArray], [sevenDateArray, sevenJsErrorArray])})
    })

    // 静态资源加载失败列表
    // this.props.getResourceErrorCountByDayAction({}, (data) => {
    //   const dateArray = [], jsErrorArray = []
    //   for (let i = 0; i <= 30; i ++) {
    //     if (!data[i]) continue
    //     dateArray.push(data[i].day)
    //     jsErrorArray.push(data[i].count)
    //   }
    //   this.props.updateHomeState({resourceErrorByDayChart: resourceErrorOption([dateArray, jsErrorArray])})
    // })

    this.props.getResourceErrorCountByHourAction((res) => {
      const data = res.data
      const dateArray = [], resourceErrorArray = []
      let resourceErrorTotalCount = 0
      for (let i = 0; i < 24; i ++) {
        if (i + 1 > data.length) {
          dateArray.push( i + "点")
          resourceErrorArray.push(0)
        } else {
          dateArray.push(data[i].day)
          resourceErrorArray.push(data[i].count)
          resourceErrorTotalCount = resourceErrorTotalCount + parseInt(data[i].count, 10)
        }
      }
      this.props.updateHomeState({resourceErrorTotalCount, resourceErrorByDayChart: resourceErrorOption([dateArray, resourceErrorArray])})
    })
  }
  choseProject() {
    this.props.clearHomeState()
    setTimeout(() => {
      this.initData()
    }, 2000)
  }
  loadedProjects() {
    setTimeout(() => {
      this.initData()
    }, 2000)
  }
  turnToJsError() {
    this.props.history.push("javascriptError")
  }
  turnToBehaviors() {
    this.props.history.push("behaviors")
  }
  snow(canvas) {
    const context = canvas.getContext("2d")
    // 微粒子创建数组
    const particles = []
    for (let j = 0; j < 400; j++) {
      const floorIndex = j % 5
      const colors = ["#EE7657", "#6AEC5F", "#F6EE72", "#F36DF6", "#80F6C2"]
      particles.push({// 设置雪花的初始位x，y  x,y向上的速度，以及雪花的大小颜色，随机生成的
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: Math.random() * 1 - 0.5,
        vy: Math.random() * 1 + 0.5,
        size: 1 + Math.random() * 1,
        color: colors[floorIndex]
      })
    }
    // 进行绘制
    function timeUp() {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight)
      // 清除画布
      let particle = {}
      for (let i = 0; i < 500; i++) {// 遍历所有的雪花
        particle = particles[i]
        if (!particle) continue
        particle.x += particle.vx// 更新雪花的新的x,y位置
        particle.y += particle.vy
        if (particle.x < 0) {
          particle.x = window.innerWidth// 如果雪花的位置放在了左侧意外，然后使其显示在窗口右边
        }
        if (particle.x > window.innerWidth) {
          particle.x = 0
        }
        if (particle.y >= window.innerHeight) {
          particle.y = 0
        }
        // 设置雪花颜色
        context.fillStyle = particle.color
        context.beginPath()// 开始绘制雪花
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)// 绘制圆形
        context.closePath()// 必和路径
        context.fill()
      }
    }

    setInterval(timeUp, 40)
  }
}
