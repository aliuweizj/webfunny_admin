import { createAction } from "redux-actions"
import HttpUtil from "Common/http-util"
import HttpApi from "Common/http-api"
export const updateShowScreenShotState = createAction("updateShowScreenShotState", payload => payload)

export const clearShowScreenShotState = createAction("clearShowScreenShotState")


export const getScreenShotListAction = (handleResult) => () => {
  return HttpUtil.get(HttpApi.getScreenShotInfoListByPage).then( response => {
    handleResult(response.data)
  }, () => {
    console.log("未能成功获取支持银行卡列表")
  })
}
