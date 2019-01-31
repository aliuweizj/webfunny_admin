import { handleActions } from "redux-actions"

const initialState = {
  exampleSearchValue: "B371438C-8321-4834-94FB-72BAC8AAE45F",
  searchValue: "",
  webMonitorId: "",
  behaviorList: [],
  searchFlag: false,
  userInfo: null,
  previewUrl: "",
  timeScope: 0,
  showMore: false
}

export default handleActions({

  updateBehaviorsState: (state = initialState, { payload }) => {
    return {
      ...state,
      ...payload
    }
  },

  clearBehaviorsState: () => {
    return {
      ...initialState
    }
  }
}, initialState)
