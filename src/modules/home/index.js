import "./index.scss"
import React, { Component } from "react"
import Header from "Components/header"
import ChartFactory from "Components/chartFactory"
import { customerGrowCountByMonth, loadPageTimeOption } from "ChartConfig/homeChartConfig"
import { jsErrorOptionByHour } from "ChartConfig/jsChartOption"
import { Card, Icon, Spin } from "antd"
export default class Home extends Component {
  constructor(props) {
    super(props)
    this.initData.bind(this)
  }
  render() {
    const { customerPvChart, jsErrorByHourChart, loadPageTimeChart } = this.props
    return <div className="home-container">
      <Header
        chooseProject={this.choseProject.bind(this)}
        loadedProjects={this.loadedProjects.bind(this)}
        parentProps={this.props}
      />
      <div className="home-mask">
        <div className="home-content">
          <Card title={<div ><Icon type="clock-circle-o" /> Js报错实时监控 </div>} extra={<a onClick={this.turnToJsError.bind(this)}>报错详情 <Icon type="right" /></a>} style={{ width: "33%", float: "left" }}>
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

          <Card title={<div><Icon type="hourglass" /> 页面加载时间 </div>} style={{ width: "32%", float: "left" }}>
            {
              loadPageTimeChart ?
                <ChartFactory
                  option={loadPageTimeChart}
                />
                :
                <div className="chart-loading">
                  <Spin tip="Loading..."/>
                </div>
            }
          </Card>
        </div>
      </div>
    </div>
  }
  initData() {
    this.props.getJsErrorCountByHourAction((res) => {
      const data = res.data
      const dateArray = [], jsErrorArray = []
      for (let i = 0; i < data.length; i ++) {
        dateArray.push(data[i].day)
        jsErrorArray.push(data[i].count)
      }
      this.props.updateHomeState({jsErrorByHourChart: jsErrorOptionByHour([dateArray, jsErrorArray])})
    })
    this.props.getPageLoadTimeByDateAction({timeScope: 1}, (data) => {
      this.props.updateHomeState({loadPageTimeChart: loadPageTimeOption(data)})
    })
  }
  choseProject() {
    this.props.clearHomeState()
    setTimeout(() => {
      this.initData()
    }, 5000)
  }
  loadedProjects() {
    setTimeout(() => {
      this.initData()
    }, 5000)
  }
  turnToJsError() {
    this.props.history.push("javascriptError")
  }
  turnToBehaviors() {
    this.props.history.push("behaviors")
  }
}
