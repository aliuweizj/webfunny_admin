import "./index.scss"
import React, { Component } from "react"
const echarts = require("echarts")
class ChartFactory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chartId: Math.random(),
      logOutlineChart: null
    }
  }

  componentDidMount() {
    let logOutlineChart = {}
    // 基于准备好的dom，初始化echarts实例
    logOutlineChart = echarts.init(document.getElementById(this.state.chartId))
    // 使用刚指定的配置项和数据显示图表。
    console.log(this.props.option)
    logOutlineChart.setOption(this.props.option)
    $(window).resize(() => {
      logOutlineChart.resize()
    })
    this.setState({logOutlineChart})
    if (typeof this.props.handleClick === "function") {
      logOutlineChart.on("click", (params) => {
        this.props.handleClick(params)
      })
    }
  }

  componentDidUpdate() {
    this.state.logOutlineChart && this.state.logOutlineChart.setOption(this.props.option)
  }
  /**
   * 渲染界面
   */
  render() {
    return <div className="chart-content" style={this.props.style}>
      <div id={this.state.chartId} className="ct-chart" />
    </div>
  }
}
export default ChartFactory
