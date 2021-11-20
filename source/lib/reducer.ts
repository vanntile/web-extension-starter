import { PAGE_RECORDER } from './constants'

export const ACTIONS = {
  CHANGE_PAGE: 'change_page',
  CHANGE_BOARD: 'change_board',
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTIONS.CHANGE_PAGE:
      return {
        ...state,
        page: action.payload,
      }
    case ACTIONS.CHANGE_BOARD:
      return {
        ...state,
        boardChanged: true,
      }
    default:
      return state
  }
}

export const initialState: State = {
  page: PAGE_RECORDER,
  boardChanged: false,
}
