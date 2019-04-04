import { createAction } from "redux-actions"
import HttpUtil from "Common/http-util"
import HttpApi from "Common/http-api"
export const updateResourceErrorState = createAction("updateResourceErrorState", payload => payload)

export const clearResourceErrorState = createAction("clearResourceErrorState")

export const getResourceErrorCountByDayAction = (params, handleResult) => () => {
  return HttpUtil.get(HttpApi.getResourceErrorCountByDay, params).then( response => {
    handleResult(response.data)
  })
}

export const getResourceLoadInfoListByDayAction = (params, handleResult) => () => {
  return HttpUtil.get(HttpApi.getResourceLoadInfoListByDay, params).then( response => {
    handleResult(response.data)
  })
}