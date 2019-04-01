import { handleActions } from "redux-actions"

const initialState = {
  customerPvChart: null,
  jsErrorByHourChart: null,
  loadPageTimeChart: null,
  resourceErrorByDayChart: null
}

export default handleActions({

  updateHomeState: (state = initialState, { payload }) => {
    return {
      ...state,
      ...payload
    }
  },

  clearHomeState: () => {
    return {
      ...initialState
    }
  }
}, initialState)
