import { createAction } from "redux-actions"
import HttpUtil from "Common/http-util"
import HttpApi from "Common/http-api"
export const updateHomeState = createAction("updateHomeState", payload => payload)

export const clearHomeState = createAction("clearHomeState")

export const getCustomerCountByTimeAction = (params, handleResult) => () => {
  return HttpUtil.post(HttpApi.getCustomerCountByTime, params).then( response => {
    handleResult(response.data)
  })
}

export const getPageLoadTimeByDateAction = (params, handleResult) => () => {
  return HttpUtil.post(HttpApi.getPageLoadTimeByDate, params).then( response => {
    handleResult(response.data)
  })
}