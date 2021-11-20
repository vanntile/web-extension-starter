import * as React from 'react'
import { useContext, useEffect } from 'react'
import { browser } from 'webextension-polyfill-ts'
import { BoardSelection, NoteRecorder } from '../components'
import { NO_BOARD, PAGE_BOARD } from '../lib/constants'
import GlobalContext from '../lib/context'
import useLocalStorage from '../lib/hooks/useLocalStorage'

const MainComponent: React.FC = () => {
  const [boardId] = useLocalStorage('boardId', NO_BOARD)
  const [state] = useContext(GlobalContext)

  useEffect(() => {
    const pauseVideo = async () => {
      const tabs = await browser.tabs.query({ active: true, currentWindow: true })
      const currentTab = tabs[0]

      await browser.tabs.executeScript(currentTab.id, {
        code: `document.getElementsByClassName('html5-main-video')[0].pause()`,
      })
    }

    pauseVideo().catch(console.error)
  }, [])

  return (
    <main className="p-4 min-w-[500px] min-h-[300px]">
      {(boardId === NO_BOARD && !state.boardChanged) || state.page === PAGE_BOARD ? (
        <BoardSelection />
      ) : (
        <NoteRecorder />
      )}
    </main>
  )
}

export default MainComponent
