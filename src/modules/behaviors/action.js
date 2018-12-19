import { createAction } from "redux-actions"
import HttpUtil from "Common/http-util"
import HttpApi from "Common/http-api"
export const updateBehaviorsState = createAction("updateBehaviorsState", payload => payload)

export const clearBehaviorsState = createAction("clearBehaviorsState")

export const searchUserBehaviorsAction = (param, handleResult, handleFailResult) => () => {
  return HttpUtil.post(HttpApi.searchUserBehaviors, param, {timeout: 60 * 1000}).then( response => {
    handleResult(response.data)
  }).catch(() => {
    handleFailResult()
  })
}