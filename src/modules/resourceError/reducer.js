import { handleActions } from "redux-actions"

const initialState = {
  isFetching: false
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
