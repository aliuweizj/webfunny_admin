import { createAction } from "redux-actions"
import HttpUtil from "Common/http-util"
import HttpApi from "Common/http-api"
export const updateCreateProjectState = createAction("updateCreateProjectState", payload => payload)

export const clearCreateProjectState = createAction("clearCreateProjectState")

export const createNewProjectAction = (params, handleResult) => () => {
  return HttpUtil.post(HttpApi.createNewProject, params).then( response => {
    handleResult(response.data)
  })
}