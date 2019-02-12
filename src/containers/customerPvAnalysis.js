import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import CustomerPvAnalysis from "Modules/customerPvAnalysis"
import * as actions from "Modules/customerPvAnalysis/action"

const CustomerPvAnalysisContainer = props => <CustomerPvAnalysis {...props} />

const mapStateToProps = state => {
  const { customerPvAnalysis } = state
  return { ...customerPvAnalysis }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ ...actions }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomerPvAnalysisContainer)
