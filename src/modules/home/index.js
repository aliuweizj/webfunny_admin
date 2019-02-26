import "./index.scss"
import React, { Component } from "react"
import Header from "Components/header"
import ChartFactory from "Components/chartFactory"
import { jsErrorOptionByHour } from "ChartConfig/jsChartOption"
import { Card, Icon, Spin } from "antd"
export default class Home extends Component {
  constructor(props) {
    super(props)
    this.initData.bind(this)
  }

  componentDidMount() {
    const canvas = document.querySelector("#snowCanvas")
    this.snow(canvas)
  }

  render() {
    const { jsErrorByHourChart } = this.props
    return <div className="home-container">
      <canvas className="snow-canvas" id="snowCanvas"></canvas>
      <Header
        chooseProject={this.choseProject.bind(this)}
        loadedProjects={this.loadedProjects.bind(this)}
        parentProps={this.props}
      />
      <div className="home-mask">
        <div className="home-content">
          <div className="left">
            <Card title={<div ><Icon type="clock-circle-o" /> Js报错实时监控 </div>} extra={<a onClick={this.turnToJsError.bind(this)}>错误统计 <Icon type="right" /></a>} style={{ width: "99%", float: "left" }}>
              {
                jsErrorByHourChart ?
                  <ChartFactory
                    option={jsErrorByHourChart}
                  />
                  :
                  <div className="chart-loading">
                    <Spin tip="Loading..."/>
                  </div>
              }
            </Card>

          </div>
          <div className="right">
            <Card title={<div >项目运行状态 </div>} style={{ width: "99%", float: "left" }}>
              <p><img className="info-icon" src={require("Images/home/PV.png")}/>当天访问量：</p>
              <p><img className="info-icon" src={require("Images/home/UV.png")}/>当天日活量：</p>
              <p><img className="info-icon" src={require("Images/home/Error.png")}/>当天错误量：</p>
              <p><img className="info-icon" src={require("Images/home/load_time.png")}/>页面加载时长：</p>
              <p><img className="info-icon" src={require("Images/home/response.png")}/>接口响应时长：</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  }
  initData() {
    this.props.getJsErrorCountByHourAction((res) => {
      const data = res.data.today
      const dateArray = [], jsErrorArray = []

      for (let i = 0; i < 24; i ++) {
        if (i + 1 > data.length) {
          dateArray.push( i + "点")
          jsErrorArray.push(0)
        } else {
          dateArray.push(data[i].day)
          jsErrorArray.push(data[i].count)
        }
      }
      const seven = res.data.seven
      const sevenDateArray = [], sevenJsErrorArray = []

      for (let i = 0; i < 24; i ++) {
        if (i + 1 > seven.length) {
          sevenDateArray.push( i + "点")
          sevenJsErrorArray.push(0)
        } else {
          sevenDateArray.push(seven[i].day)
          sevenJsErrorArray.push(seven[i].count)
        }
      }
      this.props.updateHomeState({jsErrorByHourChart: jsErrorOptionByHour([dateArray, jsErrorArray], [sevenDateArray, sevenJsErrorArray])})
    })
    // this.props.getPageLoadTimeByDateAction({timeScope: 1}, (data) => {
    //   this.props.updateHomeState({loadPageTimeChart: loadPageTimeOption(data)})
    // })
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
      particles.push({// 设置雪花的初始位x，y  x,y向上的速度，以及雪花的大小颜色，随机生成的
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: Math.random() * 1 - 0.5,
        vy: Math.random() * 1 + 0.5,
        size: 1 + Math.random() * 1,
        color: "#fff"
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
