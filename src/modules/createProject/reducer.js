import { handleActions } from "redux-actions"

const initialState = {
  isFetching: false
}

export default handleActions({

  updateCreateProjectState: (state = initialState, { payload }) => {
    return {
      ...state,
      ...payload
    }
  },

  clearCreateProjectState: () => {
    return {
      ...initialState
    }
  }
}, initialState)
