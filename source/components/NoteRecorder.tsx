import * as React from 'react'
import { useEffect, useState } from 'react'
import { browser } from 'webextension-polyfill-ts'
import { ColorPicker } from '.'
import { DEFAULT_COLOR, NO_BOARD, PAGE_BOARD, PAGE_RECORDER } from '../lib/constants'
import GlobalContext from '../lib/context'
import { createStickyNote, formatTime, getNewNote } from '../lib/helpers'
import useLocalStorage from '../lib/hooks/useLocalStorage'
import { ACTIONS } from '../lib/reducer'
import { Header } from '.'

const NoteRecorder: React.FC = () => {
  const [state, dispatch] = React.useContext(GlobalContext)
  const [boardId] = useLocalStorage('boardId', NO_BOARD)
  const [sendTimeStamp, setSendTimeStamp] = useLocalStorage('sendTimeStamp', true)
  const [selectedColor, setSelectedColor] = useLocalStorage('selectedColor', DEFAULT_COLOR)
  const [noteIdx, setNoteIdx] = useLocalStorage(`noteIdx_${boardId}`, 0)
  const [boardName] = useLocalStorage('boardName', NO_BOARD)
  const [url, setUrl] = useState('')
  const [seconds, setSeconds] = useState(0)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const getTime = async () => {
      const tabs = await browser.tabs.query({ active: true, currentWindow: true })
      const currentTab = tabs[0]
      const result = await browser.tabs.executeScript(currentTab.id, {
        code: `Math.floor(document.getElementsByClassName('html5-main-video')[0].currentTime)`,
      })

      setUrl(currentTab.url as string)
      setSeconds(result[0])
    }

    getTime().catch(console.error)
  }, [])

  const handlePostNote = async () => {
    const note = getNewNote(message, selectedColor, seconds, url, sendTimeStamp, noteIdx)

    try {
      const getCanvas = async () => {
        const tabs = await browser.tabs.query({ active: true, currentWindow: true })
        const currentTab = tabs[0]

        // const [{ x, y, width, height }] = (await browser.tabs.executeScript(currentTab.id, {
        //   code: `document.getElementsByClassName('html5-main-video')[0].getBoundingClientRect()`,
        // })) as ExtensionTypes.ImageDetailsRectType[]

        const canvasData = await browser.tabs.captureVisibleTab(currentTab.windowId)

        const formData = new FormData()
        formData.append('image', canvasData)

        const res = await fetch(`https://api.imgbb.com/1/upload?expiration=600&key=${process.env.IMAGE_BB_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        })
        const fromAPI = await res.json()

        console.log({ fromAPI })
      }
      getCanvas().catch(console.error)

      await createStickyNote(note)

      setNoteIdx(noteIdx + 1)
      window.close()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div>
      <Header />
      <div className="flex flex-row items-center pb-2 mb-4 border-b-2 border-gray-200">
        <div className="flex-grow pr-4 overflow-hidden">
          <h2 className="h3">{boardName}</h2>
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
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mb-2 textarea"
          placeholder="This is interesting"
          spellCheck="true"
          rows={5}
        ></textarea>
        <div className="flex flex-row flex-nowrap">
          <label className="flex-1 checkbox">
            <input
              type="checkbox"
              tabIndex={0}
              checked={sendTimeStamp}
              onChange={() => {
                setSendTimeStamp(!sendTimeStamp)
              }}
            />
            <span>start at {formatTime(seconds)}</span>
          </label>
          <ColorPicker currentColor={selectedColor} setCurrentColor={setSelectedColor} />
        </div>
        <button className="self-center w-1/2 button button-small button-primary" type="button" onClick={handlePostNote}>
          Post note to board
        </button>
      </div>
    </div>
  )
}

export default NoteRecorder
