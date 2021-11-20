import { browser, Tabs } from 'webextension-polyfill-ts'
import { NOTE_SIZE } from './constants'

export const openWebPage = (url: string): Promise<Tabs.Tab> => {
  return browser.tabs.create({ url })
}

export const formatTime = (seconds: number): string => {
  const date = new Date(0)
  date.setSeconds(seconds)
  return seconds >= 3600 ? date.toISOString().substr(11, 8) : date.toISOString().substr(14, 5)
}

export const getNewNote = (
  text: string,
  backgroundColor: string,
  seconds: number,
  url: string,
  setTimestamp = false,
  noteIdx = 0,
) => {
  const size = NOTE_SIZE
  const gap = Math.floor(NOTE_SIZE * 0.1)
  const position = (size + gap) * noteIdx
  const content = setTimestamp
    ? `<a href='https://youtu.be/${new URL(url).searchParams.get('v')}?t=${seconds}' target='_blank'>${formatTime(
        seconds,
      )}</a> - ${text}`
    : text

  return {
    data: { content },
    style: {
      backgroundColor,
      textAlign: 'center',
      textAlignVertical: 'top',
    },
    geometry: {
      x: `${position}`,
      y: '0.0',
      width: `${size}`,
      rotation: '0',
    },
  }
}

export const createStickyNote = async (data: any) => {
  const res = await fetch(`https://api.miro.com/v2/boards/${process.env.BOARD}/sticky_notes`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.MIRO_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return await res.json()
}

export default {
  openWebPage,
  formatTime,
  getNewNote,
  createStickyNote,
}
