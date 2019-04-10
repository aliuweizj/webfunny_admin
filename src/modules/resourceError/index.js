import "./index.scss"
import React, { Component } from "react"
import { Row, Col, Tabs, Card, Icon, Spin } from "antd"
import Header from "Components/header"
import ChartFactory from "Components/chartFactory"
import { resourceErrorOption } from "ChartConfig/resourceChartOption"
import Utils from "Common/utils"
const TabPane = Tabs.TabPane
class ResourceError extends Component {
  constructor(props) {
    super(props)
    this.initData = this.initData.bind(this)
  }

  componentDidMount() {
    this.initData()
  }

  render() {
    const { resourceErrorByDayChart, resourceLoadErrorList } = this.props
    return <div className="resourceError-container">
      <Header
        chooseProject={this.choseProject.bind(this)}
        loadedProjects={this.loadedProjects.bind(this)}
        parentProps={this.props}
      />
      <Row>
        <Card className="main-info-container">
          <Col span={16}>
            <Tabs defaultActiveKey="1" >
              <TabPane tab={<span><Icon type="area-chart" />静态资源加载失败总数</span>} key="1">
                {
                  resourceErrorByDayChart ?
                    <ChartFactory
                      style={{ height: 260, paddingBottom: 20 }}
                      option={resourceErrorByDayChart}
                    />
                    :
                    <div className="chart-loading">
                      <Spin tip="Loading..."/>
                    </div>
                }
              </TabPane>
            </Tabs>
          </Col>
          <Col span={8}>
            <Tabs defaultActiveKey="1" >
              <TabPane tab={<span><Icon type="file-text" />今日概况</span>} key="1">

              </TabPane>
            </Tabs>
          </Col>
        </Card>

      </Row>
      <Row>
        <Tabs defaultActiveKey="1" >
          <TabPane tab={<span><Icon type="tags-o" />静态资源加载失败列表(<b>TOP15</b>)</span>} key="1">
            <Card className="error-list-container">
              { resourceLoadErrorList &&
                resourceLoadErrorList.map((resource, index) => {
                  if (!resource.sourceUrl.length) return null
                  return <p key={index}>
                    <span>{ Utils.b64DecodeUnicode(resource.sourceUrl) } <a disabled> 影响范围 <Icon type="export" /></a></span>
                    <span>{ resource.count }次</span>
                  </p>
                })
              }
            </Card>
          </TabPane>
        </Tabs>

      </Row>
    </div>
  }
  initData() {
    this.props.getResourceLoadInfoListByDayAction({}, (data) => {
      this.props.updateResourceErrorState({resourceLoadErrorList: data})
    })
    // 静态资源加载失败列表
    this.props.getResourceErrorCountByDayAction({}, (data) => {
      const dateArray = [], jsErrorArray = []
      for (let i = 0; i <= 30; i ++) {
        if (!data[i]) continue
        dateArray.push(data[i].day)
        jsErrorArray.push(data[i].count)
      }
      this.props.updateResourceErrorState({resourceErrorByDayChart: resourceErrorOption([dateArray, jsErrorArray])})
    })
  }
  choseProject() {
  }
  loadedProjects() {
  }
}

ResourceError.propTypes = {
}

export default ResourceError
