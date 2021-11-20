import * as React from 'react'
import { BoardSelection, NoteRecorder } from '../components'
import { NO_BOARD } from '../lib/constants'
import useLocalStorage from '../lib/hooks/useLocalStorage'

const Popup: React.FC = () => {
  const [boardId] = useLocalStorage('boardId', NO_BOARD)

  return <main className="py-6 px-2 min-w-[500px]">{boardId === NO_BOARD ? <BoardSelection /> : <NoteRecorder />}</main>
}

export default Popup
