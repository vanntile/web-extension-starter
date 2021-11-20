import * as React from 'react'
import { PAGE_BOARD, PAGE_RECORDER } from '../lib/constants'
import GlobalContext from '../lib/context'
import { ACTIONS } from '../lib/reducer'

const NoteRecorder: React.FC = () => {
  const [state, dispatch] = React.useContext(GlobalContext)
  return (
    <div>
      <div>NoteRecorder</div>
      {state.page === PAGE_RECORDER && (
        <button
          className="button button-primary"
          type="button"
          onClick={() => {
            dispatch({ type: ACTIONS.CHANGE_PAGE, payload: PAGE_BOARD })
          }}
        >
          Change board
        </button>
      )}
    </div>
  )
}

export default NoteRecorder
