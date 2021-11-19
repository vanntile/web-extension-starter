import * as React from 'react'
import { useState, useEffect } from 'react'
import { browser, Tabs } from 'webextension-polyfill-ts'

// import './styles.scss';

function openWebPage(url: string): Promise<Tabs.Tab> {
  return browser.tabs.create({ url })
}

const Popup: React.FC = () => {
  const [board, setBoard] = useState('')
  const [timestamp, setTimestamp] = useState(-1)

  useEffect(() => {
    const fetchData = async () => {
      const tabs = await browser.tabs.query({ active: true, currentWindow: true })
      const currentTab = tabs[0]

      console.log(currentTab)
      const url = currentTab.url
      if (url) setBoard(url)
    }

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error)
  }, [])

  return (
    <section id="popup" className="p-2 min-w-[500px]">
      <h1>WEB-EXTENSION-STARTER</h1>
      <button
        id="options__button"
        type="button"
        onClick={(): Promise<Tabs.Tab> => {
          return openWebPage('options.html')
        }}
      >
        Options Page
      </button>
      <div className="flex flex-row gap-2">
        <button
          className="flex-initial button button-primary"
          type="button"
          onClick={(): Promise<Tabs.Tab> => {
            return openWebPage('https://github.com/abhijithvijayan/web-extension-starter')
          }}
        >
          GitHub
        </button>
        <button
          className="flex-initial button button-primary"
          type="button"
          onClick={(): Promise<Tabs.Tab> => {
            return openWebPage('https://www.buymeacoffee.com/abhijithvijayan')
          }}
        >
          Buy Me A Coffee
        </button>
      </div>
      <div>
        <h1>New section</h1>
        <button
          className="button button-primary"
          type="button"
          onClick={async () => {
            try {
              const res = await fetch('https://api.miro.com/v2/boards?sort=alphabetically&limit=20&offset=0', {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  Authorization: 'Bearer u96gUzqd4T4LyMRI40jbr8F691Y',
                },
              })
              const data = await res.json()
              console.log(data)
              setBoard(JSON.stringify(data))
            } catch (e) {
              console.log(e)
            }
          }}
        >
          Pick board
        </button>
        <textarea defaultValue={board}></textarea>
      </div>
      <div>
        <button
          className="button button-primary"
          type="button"
          onClick={async () => {
            try {
              const res = await fetch(`https://api.miro.com/v2/boards/${process.env.BOARD}/sticky_notes`, {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  Authorization: `Bearer ${process.env.MIRO_API_TOKEN}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  data: {
                    content: 'sample sticky note 2',
                  },
                  style: {
                    backgroundColor: 'blue',
                    textAlign: 'center',
                    textAlignVertical: 'top',
                  },
                  geometry: {
                    x: '150.0',
                    y: '0.0',
                    width: '600',
                    rotation: '0',
                  },
                }),
              })
              const data = await res.json()
              console.log(data)
            } catch (e) {
              console.log(e)
            }
          }}
        >
          Create Note
        </button>
      </div>
      <div>
        <button
          className="button button-primary"
          type="button"
          onClick={async () => {
            try {
              const tabs = await browser.tabs.query({ active: true, currentWindow: true })
              const currentTab = tabs[0]
              const result = await browser.tabs.executeScript(currentTab.id, {
                code: `Math.floor(document.getElementsByClassName('html5-main-video')[0].currentTime)`,
              })

              setTimestamp(result[0])
            } catch (e) {
              console.log(e)
            }
          }}
        >
          Get youtube video timestamp
        </button>
        <p>Timestamp: {timestamp}</p>
      </div>
    </section>
  )
}

export default Popup
