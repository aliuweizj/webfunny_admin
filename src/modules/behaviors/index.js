import "./index.scss"
import React, { Component } from "react"
import { Input, Row, Icon, Timeline, BackTop, Card } from "antd"
import Header from "Components/header"
class Behaviors extends Component {
  constructor(props) {
    super(props)
    this.changeInputValue = this.changeInputValue.bind(this)
    this.search = this.search.bind(this)
    this.showPreviewPage = this.showPreviewPage.bind(this)
  }

  componentDidMount() {
    $(".behaviors-container").bind("keyup", (event) => {
      if (event.keyCode === 13) {
        this.search()
      }
    })
  }

  render() {
    const { behaviorList, searchFlag, userInfo } = this.props
    return <div className="behaviors-container">
      <BackTop>
        <Icon type="to-top" size="L"/>
      </BackTop>
      <Header
        chooseProject={this.choseProject.bind(this)}
        loadedProjects={this.loadedProjects.bind(this)}
      />
      { userInfo &&
        <Card id="infoCard" title={`${userInfo.secondUserParam}用户`}>
          <p>位置：{userInfo.city}</p>
          <p>设备：{userInfo.deviceName}</p>
          <p>系统：{userInfo.os}</p>
          <p>网络地址：{userInfo.monitorIp}</p>
          <p>截止时间：{new Date(parseInt(userInfo.happenTime, 10)).Format("yyyy-MM-dd hh:mm:ss")}</p>
        </Card>
      }
      <div className={searchFlag ? "behaviors-con behaviors-con-s" : "behaviors-con"}>
        <Input
          size="large"
          addonAfter={<Icon type="search" onClick={this.search}/>}
          placeholder="搜索用户的行为记录，请输入手机号或者USERID"
          onChange={this.changeInputValue}
        />
      </div>
      { behaviorList.length > 0 &&
        <Row className="footprint-container">
          <Timeline>
            {
              behaviorList.map((behavior, index) => {
                const happenTime = new Date(parseInt(behavior.happenTime, 10)).Format("yyyy-MM-dd hh:mm:ss.S")
                let color = ""
                let behaviorName = ""
                let behaviorContent = ""

                if (behavior.uploadType === "ELE_BEHAVIOR") {
                  color = "green"
                  behaviorName = "点击了"
                  behaviorContent = behavior.tagName + "标签 （" + behavior.innerText + "） 样式名：" + behavior.className
                } else if (behavior.uploadType === "CUSTOMER_PV") {
                  color = "blue"
                  behaviorName = "进入页面"
                  behaviorContent = behavior.simpleUrl
                } else if (behavior.uploadType === "JS_ERROR") {
                  color = "red"
                  behaviorName = "发生错误"
                  behaviorContent = behavior.errorMessage
                } else {
                  color = "black"
                }
                return <Timeline.Item color={color} key={index}>
                    <span>
                      <label className="footprint-des">{behaviorName} {behaviorContent}</label>
                      <label className="footprint-time">发生时间：{happenTime} </label>
                      <label className="footprint-time"><a style={{color: "#77b3eb"}} href={behavior.simpleUrl} target="_blank">{behavior.simpleUrl}</a></label>
                    </span>
                </Timeline.Item>
              })
            }
          </Timeline>
        </Row>
      }
    </div>
  }
  search() {
    const { searchValue, webMonitorId } = this.props
    this.props.searchUserBehaviorsAction({searchValue, webMonitorId }, (res) => {
      const len = res.length
      for (let i = 0; i < res.length - 1; i++) {
        for (let j = 0; j < res.length - 1 - i; j++) {
          if (res[j].happenTime > res[j + 1].happenTime) {
            const temp = res[j]
            res[j] = res[j + 1]
            res[j + 1] = temp
          }
        }
      }
      const userInfo = res[len - 1]
      this.props.updateBehaviorsState({behaviorList: res, searchFlag: true, userInfo})
    })
  }
  changeInputValue(e) {
    const searchValue = e.target.value
    this.props.updateBehaviorsState({searchValue})
  }
  choseProject(project) {
    const { webMonitorId } = project
    this.props.updateBehaviorsState({webMonitorId})
  }
  loadedProjects(project) {
    const { webMonitorId } = project
    this.props.updateBehaviorsState({webMonitorId})
  }
  showPreviewPage(url) {
    const previewUrl = url
    this.props.updateBehaviorsState({previewUrl})
  }
}

Behaviors.propTypes = {
}

export default Behaviors
