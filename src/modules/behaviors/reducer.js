import { handleActions } from "redux-actions"

const initialState = {
  exampleSearchValue: "19E0FF2C-EB28-E811-A0D7-702084FB832C",
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
