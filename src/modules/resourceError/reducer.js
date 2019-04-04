import { handleActions } from "redux-actions"

const initialState = {
  resourceErrorByDayChart: null,
  resourceLoadErrorList: null
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
