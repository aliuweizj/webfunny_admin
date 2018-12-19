import { handleActions } from "redux-actions"

const initialState = {
  searchValue: "15211858710",
  webMonitorId: "",
  behaviorList: [],
  searchFlag: false,
  userInfo: null,
  previewUrl: "",
  timeScope: 1
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
