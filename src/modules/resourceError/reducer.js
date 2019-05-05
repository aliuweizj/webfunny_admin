import { handleActions } from "redux-actions"

const initialState = {
  resourceErrorByDayChart: null,
  resourceLoadErrorList: null,
  timeType: 0,
  totalCount: 0,
  customerCount: 0
}

export default handleActions({

  updateResourceErrorState: (state = initialState, { payload }) => {
    return {
      ...state,
      ...payload
    }
  },

  clearResourceErrorState: () => {
    return {
      ...initialState
    }
  }
}, initialState)
