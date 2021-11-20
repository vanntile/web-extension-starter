import * as React from 'react'
import { useContext } from 'react'
import { BoardSelection, NoteRecorder } from '../components'
import { NO_BOARD, PAGE_BOARD } from '../lib/constants'
import GlobalContext from '../lib/context'
import useLocalStorage from '../lib/hooks/useLocalStorage'

const MainComponent: React.FC = () => {
  const [boardId] = useLocalStorage('boardId', NO_BOARD)
  const [state] = useContext(GlobalContext)

  return (
    <main className="py-6 px-2 min-w-[500px] min-h-[300px]">
      {boardId === NO_BOARD || state.page === PAGE_BOARD ? <BoardSelection /> : <NoteRecorder />}
    </main>
  )
}

export default MainComponent
