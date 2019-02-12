import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import Home from "Modules/home"
import * as actions from "Modules/home/action"
import { getJsErrorCountByHourAction } from "Modules/javascriptError/action"

const HomeContainer = props => <Home {...props} />

const mapStateToProps = state => {
  const { home } = state
  return { ...home }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ ...actions, getJsErrorCountByHourAction }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
