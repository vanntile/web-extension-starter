import * as React from 'react'
import { Fragment, useEffect, useState } from 'react'
import { NO_BOARD, PAGE_BOARD, PAGE_RECORDER } from '../lib/constants'
import useAsync from '../lib/hooks/useAsync'
import useLocalStorage from '../lib/hooks/useLocalStorage'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import GlobalContext from '../lib/context'
import { ACTIONS } from '../lib/reducer'
import { Header } from '.'


const boardsLoader = async () => {
const res = await fetch('https://api.miro.com/v2/boards?sort=alphabetically&limit=20&offset=0', {
method: 'GET',
headers: {
Accept: 'application/json',
Authorization: `Bearer ${process.env.MIRO_API_TOKEN}`,
},
})
const data = await res.json()
const availableBoards = data.data.map(({ name, id }: Board): Board => ({ name, id }))

return availableBoards
}

const BoardSelection: React.FC = () => {
const [state, dispatch] = React.useContext(GlobalContext)
const [boardId, setBoardId] = useLocalStorage('boardId', NO_BOARD)
const [boardName, setBoardName] = useLocalStorage('boardName', NO_BOARD)
const [selected, setSelected] = useState<Board>({ name: 'Select board', id: NO_BOARD })
  const { execute, status, value: boards, error } = useAsync(boardsLoader, false)

  useEffect(() => {
  execute()

  if (boardId !== NO_BOARD) setSelected({ name: boardName, id: boardId })
  }, [])

  const handleBoardSelection = (board: Board) => {
  setBoardId(board.id)
  setBoardName(board.name)
  setSelected(board)
  }

  return (
  <div>
    <Header />    

    <div className="flex flex-row pb-2 mb-4 border-b-2 border-gray-200">
      <div className="flex-grow pr-4 overflow-hidden">
        <h3 className="h3">{boardName}</h3>
      </div>
      {state.page === PAGE_BOARD && (
      <button className="flex-1 ml-2 text-blue-600 border-blue-600 button button-small button-primary-border"
        type="button" onClick={()=> {
        dispatch({ type: ACTIONS.CHANGE_PAGE, payload: PAGE_RECORDER })
        }}
        >
        Change note
      </button>
      )}
    </div>
    <section>
      {
      <div>
        {status === 'error' && <div>{error}</div>}
        {status === 'pending' && <div>Loading...</div>}
        {status === 'success' && (
        <Listbox value={selected} onChange={handleBoardSelection}>
          <div className="relative mt-1">
            <Listbox.Button
              className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
              <span className="block truncate">{selected.name}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <Listbox.Options
                className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {boards.map((board: Board) => (
                <Listbox.Option key={board.id} className={({ active })=>
                  `${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}
                  cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={board}
                  >
                  {({ selected, active }) => (
                  <>
                    <span className={`${selected ? 'font-medium' : 'font-normal' } block truncate`}>
                      {board.name}
                    </span>
                    {selected ? (
                    <span className={`${active ? 'text-amber-600' : 'text-amber-600' } absolute inset-y-0 left-0 flex
                      items-center pl-3`}>
                      <CheckIcon className="w-5 h-5" aria-hidden="true" />
                    </span>
                    ) : null}
                  </>
                  )}
                </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
        )}
      </div>
      }
    </section>
  </div>
  )}
  export default BoardSelection