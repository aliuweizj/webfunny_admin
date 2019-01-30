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
  }

  render() {
    const { projectList, chooseProject } = this.state
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
        <img className="git-btn" src={require("Images/common/github5.png")} onClick={this.turnToBlog.bind(this)} />
      </section>
    </div>
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
}
