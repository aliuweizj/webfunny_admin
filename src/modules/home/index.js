import "./index.scss"
import React, { Component } from "react"
import Header from "Components/header"
import ChartFactory from "Components/chartFactory"
import SvgIcons from "Components/svg_icons"
import { jsErrorOptionByHour } from "ChartConfig/jsChartOption"
import { Spin, Tabs, Icon, notification } from "antd"
import utils from "Common/utils"
const TabPane = Tabs.TabPane
export default class Home extends Component {
  constructor(props) {
    super(props)
    this.initData.bind(this)
    this.analysisErrorData.bind(this)
  }
  componentDidMount() {
    // 冬天飘雪花
    const canvas = document.querySelector("#snowCanvas")
    this.snow(canvas)
    this.openNotification()
  }

  openNotification() {
    const nowDay = new Date().Format("yyyy-MM-dd")
    if (localStorage.closeNotification && nowDay <= localStorage.closeNotification) {
      return
    }
    const key = `open${Date.now()}`
    notification.open({
      message: "更新提示（2019-05-05）",
      description: <p className="update-box">
        <span>1. 增加免部署版本，只需输入项目名称，即可生成监控代码，实时统计；</span> <br/>
        <span>2. 增加静态资源报错数据统计；</span> <br/>
        <span className="line" />
        <label>1. 增加接口报错统计分析；</label>
      </p>,
      onClose: () => {
        localStorage.closeNotification = new Date().Format("yyyy-MM-dd")
      },
      style: {
        width: 400,
        marginTop: 50,
      },
      duration: 20,
      key
    })
  }
  render() {
    const { jsErrorTotalCount, jsErrorByHourChart, resourceErrorTotalCount, resourceErrorByDayChart, httpErrorTotalCount, httpErrorByHourChart } = this.props
    return <div className="home-container">
      <canvas className="snow-canvas" id="snowCanvas" />
      <Header
        chooseProject={this.choseProject.bind(this)}
        loadedProjects={this.loadedProjects.bind(this)}
        parentProps={this.props}
        isCreateProject
      />
      <div className="home-mask">
        <div className="home-content">
          <div className="left">
            <Tabs>
              <TabPane tab={<span><Icon type="line-chart" />Js报错实时监控（今日：{jsErrorTotalCount}）</span>} key="1">
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
              <TabPane tab={<span><Icon type="file-text" />静态资源加载报错（今天：{resourceErrorTotalCount}）</span>} key="2">
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
              <TabPane tab={<span><Icon component={SvgIcons.RequestSvg} />接口请求报错（今天：{httpErrorTotalCount}）</span>} key="3">
                {
                  httpErrorByHourChart ?
                    <ChartFactory
                      style={{ height: 320, paddingBottom: 20 }}
                      option={httpErrorByHourChart}
                    />
                    :
                    <div className="chart-loading">
                      <Spin tip="Loading..."/>
                    </div>
                }
              </TabPane>
            </Tabs>
          </div>
        </div>
        <a className="bei-an-text" href="http://www.beian.miit.gov.cn">苏ICP备17071733号-2</a>
      </div>
    </div>
  }
  initData() {
    const hours = utils.get24HoursArray().reverse()
    const sevenHours = utils.getSevenDaysAgo24HoursArray().reverse()
    this.props.getJsErrorCountByHourAction((res) => {
      const data = res.data.today
      const seven = res.data.seven
      const jsErrorInfo = this.analysisErrorData(data, hours)
      const sevenDayAgoJsErrorInfo = this.analysisErrorData(seven, sevenHours)
      this.props.updateHomeState({jsErrorTotalCount: jsErrorInfo.errorTotalCount, jsErrorByHourChart: jsErrorOptionByHour([hours, jsErrorInfo.errorArray], [hours, sevenDayAgoJsErrorInfo.errorArray])})
    })
    this.props.getResourceErrorCountByHourAction((res) => {
      const data = res.data.today
      const seven = res.data.seven
      const errorInfo = this.analysisErrorData(data, hours)
      const sevenDayAgoErrorInfo = this.analysisErrorData(seven, sevenHours)
      this.props.updateHomeState({resourceErrorTotalCount: errorInfo.errorTotalCount, resourceErrorByDayChart: jsErrorOptionByHour([hours, errorInfo.errorArray], [hours, sevenDayAgoErrorInfo.errorArray])})
    })
    // 接口请求报错列表
    this.props.getHttpErrorCountByHourAction((res) => {
      const data = res.data.today
      const seven = res.data.seven
      const errorInfo = this.analysisErrorData(data, hours)
      const sevenDayAgoErrorInfo = this.analysisErrorData(seven, sevenHours)
      console.log(errorInfo, sevenDayAgoErrorInfo)
      this.props.updateHomeState({httpErrorTotalCount: errorInfo.errorTotalCount, httpErrorByHourChart: jsErrorOptionByHour([errorInfo.dateArray, errorInfo.errorArray], [errorInfo.dateArray, sevenDayAgoErrorInfo.errorArray])})
    })
  }
  analysisErrorData(data, hours) {
    const nowHour = new Date().getHours()
    const dateArray = [], errorArray = []
    let errorTotalCount = 0
    for (let i = 0; i < hours.length; i ++) {
      let isInclude = false
      for (let j = 0; j < data.length; j ++) {
        if (data[j].hour === hours[i]) {
          const tempHour = hours[i]
          dateArray.push(tempHour + "时")
          errorArray.push(data[j].count)
          if (nowHour >= parseInt(tempHour.substring(6, 8), 10)) {
            errorTotalCount = errorTotalCount + parseInt(data[j].count, 10)
          }
          isInclude = true
          break
        }
      }
      if (isInclude === false) {
        dateArray.push(hours[i] + "时")
        errorArray.push(0)
      }
    }
    return {errorTotalCount, dateArray, errorArray}
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
