import { PAGE_RECORDER } from './constants'

export const ACTIONS = {
  CHANGE_PAGE: 'change_page',
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTIONS.CHANGE_PAGE:
      return {
        ...state,
        page: action.payload,
      }
    default:
      return state
  }
}

export const initialState: State = {
  page: PAGE_RECORDER,
}
