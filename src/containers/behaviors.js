import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import Behaviors from "Modules/behaviors"
import * as actions from "Modules/behaviors/action"

const BehaviorsContainer = props => <Behaviors {...props} />

const mapStateToProps = state => {
  const { behaviors } = state
  return { ...behaviors }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ ...actions }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(BehaviorsContainer)
