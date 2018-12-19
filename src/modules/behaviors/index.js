import "./index.scss"
import React, { Component } from "react"
import { Input, Row, Icon, Timeline, BackTop, Card, Button, Spin } from "antd"
import Header from "Components/header"
class Behaviors extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
    this.changeInputValue = this.changeInputValue.bind(this)
    this.search = this.search.bind(this)
    this.showPreviewPage = this.showPreviewPage.bind(this)
  }

  componentDidMount() {
    $("#searchBox, .ant-spin-container, .behaviors-container").bind("keyup", (event) => {
      if (event.keyCode === 13) {
        this.search()
      }
    })
  }

  render() {
    const { behaviorList, searchFlag, userInfo, timeScope } = this.props
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
      <Spin spinning={this.state.loading}>
        <div className={searchFlag ? "behaviors-con behaviors-con-s" : "behaviors-con"}>
          <Input
            id="searchBox"
            size="large"
            addonAfter={<Icon type="search" onClick={this.search}/>}
            placeholder="搜索用户的行为记录，请输入手机号或者USERID"
            onChange={this.changeInputValue}
          />
          <Button onClick={this.chooseTimeScope.bind(this, 1)} type={timeScope === 1 ? "primary" : "ghost"} size="small" style={{ width: 80, marginRight: "0.18rem", marginTop: "0.1rem" }}>1天</Button>
          <Button onClick={this.chooseTimeScope.bind(this, 2)} type={timeScope === 2 ? "primary" : "ghost"} size="small" style={{ width: 80, marginRight: "0.18rem", marginTop: "0.1rem" }}>2天</Button>
          <Button onClick={this.chooseTimeScope.bind(this, 3)} type={timeScope === 3 ? "primary" : "ghost"} size="small" style={{ width: 80, marginRight: "0.18rem", marginTop: "0.1rem" }}>3天</Button>
          <Button onClick={this.chooseTimeScope.bind(this, 7)} type={timeScope === 7 ? "primary" : "ghost"} size="small" style={{ width: 80, marginRight: "0.18rem", marginTop: "0.1rem" }}>7天</Button>
          <Button onClick={this.chooseTimeScope.bind(this, 30)} type={timeScope === 30 ? "primary" : "ghost"} size="small" style={{ width: 80, marginRight: "0.18rem", marginTop: "0.1rem" }}>全部</Button>
        </div>
        { behaviorList.length > 0 &&
        <Row className="footprint-container">
          <Timeline>
            {
              behaviorList.map((behavior, index) => {
                const happenTime = new Date(parseInt(behavior.happenTime, 10)).Format("yyyy-MM-dd hh:mm:ss.S")
                const serverTime = new Date(behavior.createdAt).Format("yyyy-MM-dd hh:mm:ss.S")
                const completeUrl = decodeURIComponent(behavior.completeUrl || behavior.simpleUrl)
                let color = ""
                let behaviorName = ""
                let behaviorContent = ""
                if (behavior.uploadType === "ELE_BEHAVIOR") {
                  color = "green"
                  behaviorName = "点击了"
                  let innerText = ""
                  const innerTextTemp = behavior.innerText
                  const reg = new RegExp("[\\u4E00-\\u9FFF]+", "g")
                  if (innerTextTemp && !reg.test(innerTextTemp)) {
                    const tempArr = innerTextTemp.match(/(%[a-zA-Z0-9]{2}){3}/g)
                    if (tempArr) {
                      tempArr.forEach((item) => {
                        try {
                          const itemText = decodeURIComponent(item)
                          innerText += itemText
                        } catch (e) {console.log()}
                      })
                    } else {
                      innerText = innerTextTemp
                    }
                  } else {
                    innerText = innerTextTemp
                  }
                  behaviorContent = behavior.tagName + "标签 （" + innerText + "） 样式名：" + behavior.className
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
                      <label className="footprint-time"><b>客户端时间：{happenTime}</b> -- <i>服务器时间：{serverTime}</i></label>
                      <label className="footprint-time"><a style={{color: "#77b3eb"}} href={completeUrl} target="_blank">{completeUrl}</a></label>
                    </span>
                </Timeline.Item>
              })
            }
          </Timeline>
        </Row>
        }
      </Spin>

    </div>
  }
  search() {
    const { searchValue, webMonitorId, timeScope } = this.props
    this.setState({loading: true})
    this.props.searchUserBehaviorsAction({searchValue, webMonitorId, timeScope }, (res) => {
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
      this.setState({loading: false})
    }, () => {
      this.setState({loading: false})
    })
  }
  changeInputValue(e) {
    const searchValue = e.target.value
    this.props.updateBehaviorsState({searchValue})
  }
  chooseTimeScope(timeScope) {
    this.props.updateBehaviorsState({timeScope})
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
