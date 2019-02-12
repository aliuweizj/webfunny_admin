import { handleActions } from "redux-actions"

const initialState = {
  isFetching: false
}

export default handleActions({

  updateCustomerPvAnalysisState: (state = initialState, { payload }) => {
    return {
      ...state,
      ...payload
    }
  },

  clearCustomerPvAnalysisState: () => {
    return {
      ...initialState
    }
  }
}, initialState)
