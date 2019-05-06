import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import Home from "modules/home"
import * as actions from "modules/home/action"
import { getJsErrorCountByHourAction } from "modules/javascriptError/action"

const HomeContainer = props => <Home {...props} />

const mapStateToProps = state => {
  const { home } = state
  return { ...home }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ ...actions, getJsErrorCountByHourAction }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
