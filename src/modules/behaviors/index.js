import "./index.scss"
import React, { Component } from "react"
import { Input, Row, Icon, Timeline, BackTop, Card, Button, Spin, Popover } from "antd"
import Header from "Components/header"
import Utils from "Common/utils"
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
    const { behaviorList, searchFlag, userInfo, timeScope, showMore } = this.props
    const bLen = behaviorList.length
    let happenTimeTemp = ""
    return <div className="behaviors-container">
      <BackTop>
        <Icon type="to-top" size="L"/>
      </BackTop>
      <Header
        chooseProject={this.choseProject.bind(this)}
        loadedProjects={this.loadedProjects.bind(this)}
        parentProps={this.props}
      />
      { userInfo &&
        <Card id="infoCard" title={`${Utils.b64DecodeUnicode(userInfo.secondUserParam)}用户`}>
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
            placeholder="搜索用户的行为记录，请输入KEY或者USERID"
            onChange={this.changeInputValue}
          />
          <p className="demo-des">检索示例：(选择本地数据后) 输入：4358269e-4a5b-43bf-b417-38255e82458b</p>
          <Button onClick={this.chooseTimeScope.bind(this, 0)} type={timeScope === 0 ? "primary" : "ghost"} size="small" style={{ width: 80, marginRight: "0.18rem", marginTop: "0.1rem" }}>1天</Button>
          <Button onClick={this.chooseTimeScope.bind(this, 1)} type={timeScope === 1 ? "primary" : "ghost"} size="small" style={{ width: 80, marginRight: "0.18rem", marginTop: "0.1rem" }}>2天</Button>
          <Button onClick={this.chooseTimeScope.bind(this, 2)} type={timeScope === 2 ? "primary" : "ghost"} size="small" style={{ width: 80, marginRight: "0.18rem", marginTop: "0.1rem" }}>3天</Button>
          <Button onClick={this.chooseTimeScope.bind(this, 6)} type={timeScope === 6 ? "primary" : "ghost"} size="small" style={{ width: 80, marginRight: "0.18rem", marginTop: "0.1rem" }}>7天</Button>
          <Button onClick={this.chooseTimeScope.bind(this, 30)} type={timeScope === 30 ? "primary" : "ghost"} size="small" style={{ width: 80, marginRight: "0.18rem", marginTop: "0.1rem" }}>全部</Button>
        </div>
        { behaviorList.length > 0 &&
        <Row className="footprint-container">
          {!showMore && <Button style={{marginBottom: 20}} onClick={this.showMore.bind(this)}>展示更多</Button>}
          <Timeline>
            {
              behaviorList.map((behavior, index) => {
                if (bLen > 200 && !showMore && index < bLen - 100) {
                  return null
                }
                if (behavior.happenTime === happenTimeTemp) {
                  return null
                }
                happenTimeTemp = behavior.happenTime
                const happenTime = new Date(parseInt(behavior.happenTime, 10)).Format("yyyy-MM-dd hh:mm:ss.S")
                const completeUrl = decodeURIComponent(behavior.completeUrl || behavior.simpleUrl)
                let color = ""
                let behaviorName = ""
                let behaviorContent = ""
                if (behavior.uploadType === "ELE_BEHAVIOR") {
                  color = "#333333"
                  behaviorName = "点击了 "
                  let innerText = Utils.b64DecodeUnicode(behavior.innerText)
                  let placeholder = ""
                  const placeholderArray = behavior.placeholder.split(" ")
                  placeholderArray.forEach((item) => {
                    placeholder += Utils.b64DecodeUnicode(item) + " "
                  })
                  const reg = /[\u4e00-\u9fa5]/
                  try {
                    innerText = reg.test(innerText) ? innerText : decodeURIComponent(innerText)
                  } catch (e) {
                    innerText = innerText
                  }
                  behaviorContent = <span><label>{behavior.tagName + "标签 （" + innerText + placeholder + "）"}</label><br/><i style={{fontSize: 12}}>{"样式名：" + Utils.b64DecodeUnicode(behavior.className)}</i></span>
                } else if (behavior.uploadType === "CUSTOMER_PV") {
                  color = "blue"
                  behaviorName = "进入页面 "
                  behaviorContent = behavior.simpleUrl
                } else if (behavior.uploadType === "JS_ERROR") {
                  color = "red"
                  behaviorName = "发生错误 "
                  behaviorContent = Utils.b64DecodeUnicode(behavior.errorMessage)
                } else if (behavior.uploadType === "SCREEN_SHOT") {
                  color = "darkgoldenrod"
                  behaviorName = "屏幕截图 "
                  behaviorContent = "data:image/webp;base64," + Utils.b64DecodeUnicode(behavior.screenInfo)
                } else if (behavior.uploadType === "HTTP_LOG") {
                  const status = behavior.status
                  behaviorName = behavior.statusResult
                  color = "cyan"
                  if (behaviorName === "请求返回" && status === "200") {
                    color = "green"
                    behaviorName = <span style={{display: "block"}}>{behavior.statusResult} <i style={{fontSize: 12, color}}>{"    状态：" + status + "  "}</i></span>
                  } else if (behaviorName === "请求返回" && status !== "200") {
                    color = "red"
                    behaviorName = <span style={{display: "block"}}>{behavior.statusResult} <i style={{fontSize: 12, color}}>{"    状态：" + status + "  "}</i></span>
                  }
                  behaviorContent = <span style={{display: "block"}}><i style={{fontSize: 12}}>请求地址：{Utils.b64DecodeUnicode(behavior.httpUrl)}</i></span>
                }  else {
                  color = "black"
                }
                return <Timeline.Item color={color} key={index}>
                    <span>
                      <label className="footprint-des" onClick={this.showDetail.bind(this, behavior.uploadType, behaviorContent)}>
                        {behaviorName}
                        { behavior.uploadType === "SCREEN_SHOT" ?
                          <span>
                            <Popover placement="right" content={<img src={behaviorContent}/>} title="屏幕快照">
                              <a type="primary" style={{marginLeft: 10, marginRight: 10}}> 预览 </a>
                            </Popover>
                            <br/><i style={{fontSize: 12}}>截图描述：{Utils.b64DecodeUnicode(behavior.description)}</i>
                          </span>
                          :
                          behaviorContent
                        }
                      </label>
                      <label className="footprint-time"><b style={{color: "#666"}}>客户端时间：{happenTime}</b></label>
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
    const { webMonitorId, timeScope } = this.props
    this.setState({loading: true})
    const searchValue = Utils.b64EncodeUnicode(this.props.searchValue)
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
  showMore() {
    const showMore = this.props.showMore
    this.props.updateBehaviorsState({showMore: !showMore})
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
  showDetail(type, behaviorContent) {
    if (type === "JS_ERROR") {
      this.props.history.push("javascriptErrorDetail?errorMsg=" + behaviorContent)
    }
  }
}

Behaviors.propTypes = {
}

export default Behaviors
