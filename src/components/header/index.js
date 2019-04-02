import "./index.scss"
import React, { Component } from "react"
import { Menu, Dropdown, Icon } from "antd"
import HttpUtil from "Common/http-util"
import HttpApi from "Common/http-api"
export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projectList: [],
      chooseProject: {
        webMonitorId: "",
        projectName: ""
      }
    }
    this.choseProject = this.choseProject.bind(this)
  }

  componentDidMount() {
    const chooseWebMonitorId = window.localStorage.chooseWebMonitorId
    HttpUtil.get(HttpApi.projectList).then( res => {
      const projectList = res.data.rows
      let chooseProject = res.data.rows[0]
      for (let i = 0; i < projectList.length; i ++) {
        if (chooseWebMonitorId === projectList[i].webMonitorId) {
          chooseProject = projectList[i]
          break
        }
      }
      this.setState({projectList: res.data.rows, chooseProject})
      window.localStorage.chooseWebMonitorId = chooseProject.webMonitorId
      if (typeof this.props.loadedProjects === "function") this.props.loadedProjects(chooseProject)
    }, () => {
      throw new Error("未能成功获取应用列表")
    })
    $(window).scroll(() => {
      const top = $(document).scrollTop()
      if (top > 100) {
        $(".header-container").fadeOut()
      } else if (top < 20) {
        $(".header-container").fadeIn()
      }
    })
  }

  render() {
    const { projectList, chooseProject } = this.state
    const errorNameList = [
      {
        name: "Js错误统计",
        url: "javascriptError"
      },
      {
        name: "静态资源错误统计",
        url: "resourceError"
      },
      {
        name: "接口请求错误统计（待发布）",
        url: ""
      },
    ]
    const menu =
      <Menu>
        {
          projectList.map((project, index) => {
            return <Menu.Item key={ index }>
              <a onClick={this.choseProject.bind(this, project)}>{project.projectName}</a>
            </Menu.Item>
          })
        }
      </Menu>

    const errorMenu =
      <Menu>
        {
          errorNameList.map((errorName, index) => {
            return <Menu.Item key={ index }>
              <a onClick={this.turnToErrorPage.bind(this, errorName)}>{errorName.name}</a>
            </Menu.Item>
          })
        }
      </Menu>
    return <div className="header-container">
      <section className="sub-header">
        <Icon className="home-icon" type="home" onClick={this.turnToHome.bind(this)}/>
        <div className="project-select-box">
          <Dropdown overlay={menu} trigger={["click"]}>
            <a className="ant-dropdown-link" href="#">
              {chooseProject.projectName} <Icon type="down" />
            </a>
          </Dropdown>
        </div>
        <span className="menu-right" onClick={this.turnTo.bind(this, "home")}>首页</span>
        <span className="menu-right">
          <Dropdown overlay={errorMenu} trigger={["click"]}>
            <a className="ant-dropdown-link" href="#">
              错误统计 <Icon type="down" />
            </a>
          </Dropdown>
        </span>
        <span className="menu-right" onClick={this.turnTo.bind(this, "behaviors")}>行为检索<label className="new">New</label></span>
        <span className="menu-right">性能分析<label className="not">Not</label></span>
        <img className="git-btn" src={require("Images/common/github5.png")} onClick={this.turnToBlog.bind(this)} />
      </section>
    </div>
  }
  turnTo(url) {
    this.props.parentProps.history.push(url)
  }
  turnToBlog() {
    window.open("https://www.cnblogs.com/warm-stranger/p/10209990.html")
  }
  turnToHome() {
    const {parentProps} = this.props
    parentProps.history.push("home")
  }
  choseProject(project) {
    this.setState({chooseProject: project})
    window.localStorage.chooseWebMonitorId = project.webMonitorId
    if (typeof this.props.chooseProject === "function") {
      this.props.chooseProject(project)
    }
  }
  turnToErrorPage(errorName) {
    if (!errorName.url) return
    const {parentProps} = this.props
    parentProps.history.push(errorName.url)
  }
}
