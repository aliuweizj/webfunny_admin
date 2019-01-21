import { handleActions } from "redux-actions"

const initialState = {
  isFetching: false,
  screenInfos: []
}

export default handleActions({

  updateShowScreenShotState: (state = initialState, { payload }) => {
    return {
      ...state,
      ...payload
    }
  },

  clearShowScreenShotState: () => {
    return {
      ...initialState
    }
  }
}, initialState)
