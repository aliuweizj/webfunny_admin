import { createAction } from "redux-actions"
// import HttpUtil from "Common/http-util"
// import HttpApi from "Common/http-api"
export const updateCustomerPvAnalysisState = createAction("updateCustomerPvAnalysisState", payload => payload)

export const clearCustomerPvAnalysisState = createAction("clearCustomerPvAnalysisState")
