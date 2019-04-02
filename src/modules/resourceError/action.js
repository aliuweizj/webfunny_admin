import { createAction } from "redux-actions"
// import HttpUtil from "Common/http-util"
// import HttpApi from "Common/http-api"
export const updateResourceErrorState = createAction("updateResourceErrorState", payload => payload)

export const clearResourceErrorState = createAction("clearResourceErrorState")
