import * as React from 'react'
import { NO_BOARD, PAGE_BOARD, PAGE_RECORDER } from '../lib/constants'
import GlobalContext from '../lib/context'
import useLocalStorage from '../lib/hooks/useLocalStorage'
import { ACTIONS } from '../lib/reducer'

const NoteRecorder: React.FC = () => {
  const [state, dispatch] = React.useContext(GlobalContext)
  const [sendTimeStamp, setSendTimeStamp] = useLocalStorage('sendTimeStamp', true)
  const [boardName] = useLocalStorage('boardName', NO_BOARD)

  return (
    <div>
      <div className="flex flex-row pb-2 mb-4 border-b-2 border-gray-200">
        <div className="flex-grow pr-4 overflow-hidden">
          <h1 className="h1">{boardName}</h1>
        </div>
        {state.page === PAGE_RECORDER && (
          <button
            className="flex-1 ml-2 text-blue-600 border-blue-600 button button-small button-primary-border"
            type="button"
            onClick={() => {
              dispatch({ type: ACTIONS.CHANGE_PAGE, payload: PAGE_BOARD })
            }}
          >
            Change board
          </button>
        )}
      </div>
      <div className="flex flex-col justify-center mb-2 form-group flex-nowrap">
        <label className="p-large">Your note</label>
        <textarea className="mb-2 textarea" placeholder="This is interesting" spellCheck="true" rows={5}></textarea>
        <div className="flex flex-row flex-nowrap">
          <label className="flex-1 checkbox">
            <input
              type="checkbox"
              tabIndex={0}
              checked={sendTimeStamp}
              onChange={() => {
                setSendTimeStamp(!setSendTimeStamp)
              }}
            />
            <span>Include current time in video</span>
          </label>
          <div className="block w-6 h-6 mr-2 bg-yellow-400 border-2 border-gray-500 rounded-full"></div>
        </div>
        <button className="self-center w-1/2 button button-small button-primary" type="button" onClick={() => {}}>
          Send note
        </button>
      </div>
    </div>
  )
}

export default NoteRecorder
