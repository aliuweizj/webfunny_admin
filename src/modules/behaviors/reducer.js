import { handleActions } from "redux-actions"

const initialState = {
  searchValue: "344d6fe7-482f-4aa0-a584-382ca2fb05e9",
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
