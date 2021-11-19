import * as React from 'react'
import { browser, Tabs } from 'webextension-polyfill-ts'

// import './styles.scss';

function openWebPage(url: string): Promise<Tabs.Tab> {
  return browser.tabs.create({ url })
}

const Popup: React.FC = () => {
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
    </section>
  )
}

export default Popup
