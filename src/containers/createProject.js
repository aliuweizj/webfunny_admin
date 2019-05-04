import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import CreateProject from "Modules/createProject"
import * as actions from "Modules/createProject/action"

const CreateProjectContainer = props => <CreateProject {...props} />

const mapStateToProps = state => {
  const { createProject } = state
  return { ...createProject }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ ...actions }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateProjectContainer)
