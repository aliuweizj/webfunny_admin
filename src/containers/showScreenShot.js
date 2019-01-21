import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import ShowScreenShot from "Modules/showScreenShot"
import * as actions from "Modules/showScreenShot/action"

const ShowScreenShotContainer = props => <ShowScreenShot {...props} />

const mapStateToProps = state => {
  const { showScreenShot } = state
  return { ...showScreenShot }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ ...actions }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ShowScreenShotContainer)
