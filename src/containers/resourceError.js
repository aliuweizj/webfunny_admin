import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import ResourceError from "Modules/resourceError"
import * as actions from "Modules/resourceError/action"

const ResourceErrorContainer = props => <ResourceError {...props} />

const mapStateToProps = state => {
  const { resourceError } = state
  return { ...resourceError }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ ...actions }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ResourceErrorContainer)
