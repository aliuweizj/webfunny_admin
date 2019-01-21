import "./index.scss"
import React, { Component } from "react"
import Utils from "Common/utils"
import { Popover } from "antd"
class ShowScreenShot extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getScreenShotListAction((res) => {
      this.props.updateShowScreenShotState({screenInfos: res})
    })
  }

  render() {
    const { screenInfos } = this.props
    return <div className="showScreenShot-container">
      {
        screenInfos.map((item, index) => {
          let imgStr = Utils.b64DecodeUnicode(item.screenInfo.toString())
          if (imgStr.indexOf("data:image/png;base64,") === -1) {
            imgStr = "data:image/png;base64," + imgStr
          }
          return <Popover
            key={index}
            content={
              <div>
                <p>URL: {item.simpleUrl}</p>
                <p>设备: {item.deviceName + " " + item.os}</p>
              </div>
            }
            title="Title">
            <img style={{width: 200, height: 320, padding: 5, float: "left"}} src={imgStr}/>
          </Popover>
        })
      }
    </div>
  }
}

ShowScreenShot.propTypes = {
}

export default ShowScreenShot
