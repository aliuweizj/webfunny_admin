import { createAction } from "redux-actions"
import HttpUtil from "Common/http-util"
import HttpApi from "Common/http-api"
export const updateBehaviorsState = createAction("updateBehaviorsState", payload => payload)

export const clearBehaviorsState = createAction("clearBehaviorsState")

export const searchUserBehaviorsAction = (param, handleResult, handleFailResult) => () => {
  return HttpUtil.post(HttpApi.searchUserBehaviors, param).then( response => {
    handleResult(response.data)
  }).catch(() => {
    handleFailResult()
  })
}

export const searchCustomerInfoAction = (param, handleResult, handleFailResult) => () => {
  return HttpUtil.post(HttpApi.searchCustomerInfo, param).then( response => {
    handleResult(response.data)
  }).catch(() => {
    handleFailResult()
  })
}