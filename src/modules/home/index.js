import "./index.scss"
import React, { Component } from "react"
import { Card, Button, Icon } from "antd"

export default class Home extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const canvas = document.querySelector("#snowCanvas")
    this.snow(canvas)
  }

  render() {
    return <div className="home-container">
      <canvas className="snow-canvas" id="snowCanvas">你的浏览器不支持canvas</canvas>
      <div className="home-mask">
        <span className="home-title">WebFunny <Button onClick={this.turnToBlog.bind(this)} className="git-btn" shape="circle" size="large" icon="github" /></span>
        <div className="home-content">
          <Card onClick={this.turnToJsError.bind(this)} title={<div><Icon type="area-chart" /> 页面错误分析 </div>} extra={<a href="#">详情 <Icon type="right" /></a>} style={{ width: 300, float: "left" }}>
            <p><Icon type="dot-chart" style={{color: "#5d5cb6", fontWeight: "bold"}} /> <span> 分析2周内，页面报错的变化趋势，错误率信息。</span></p>
            <p><Icon type="bars" style={{color: "#5d5cb6", fontWeight: "bold"}} /> <span> 统计页面发生错误列表，页面发生的错误列表。</span></p>
            <p><Icon type="code-o" style={{color: "#5d5cb6", fontWeight: "bold"}} /> <span> 针对单个错误进行详细分析，定位错误位置，提高解决效率。</span></p>
          </Card>
          <Card onClick={this.turnToBehaviors.bind(this)} title={<div><Icon type="search" /> 用户行为检索 </div>} extra={<a href="#">详情 <Icon type="right" /></a>} style={{ width: 300, float: "left" }}>
            <p><Icon type="search" style={{color: "#5d5cb6", fontWeight: "bold"}} /><span> 统计用户在页面上的行为，输入关键词进行搜索。</span></p>
            <p><Icon type="picture" style={{color: "#5d5cb6", fontWeight: "bold"}} /><span> 包括: 进入页面，点击，请求，报错，以及页面的部分截图信息。</span></p>
            <p><Icon type="like-o" style={{color: "#5d5cb6", fontWeight: "bold"}} /><span> 可以快速复现线上用户行为，解决不限于BUG的很多问题。</span></p>
          </Card>
        </div>

      </div>
    </div>
  }
  turnToBlog() {
    window.open("https://www.cnblogs.com/warm-stranger/p/10209990.html")
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
