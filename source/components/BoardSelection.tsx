import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import * as React from 'react'
import { Fragment, useEffect } from 'react'
import { Header } from '.'
import { NO_BOARD, PAGE_RECORDER } from '../lib/constants'
import GlobalContext from '../lib/context'
import useAsync from '../lib/hooks/useAsync'
import useLocalStorage from '../lib/hooks/useLocalStorage'
import { ACTIONS } from '../lib/reducer'

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
  const context = React.useContext(GlobalContext)
  const dispatch = context[1]
  const [boardId, setBoardId] = useLocalStorage('boardId', NO_BOARD)
  const [boardName, setBoardName] = useLocalStorage('boardName', NO_BOARD)
  const [selected, setSelected] = useLocalStorage<Board>('selectedBoard', { name: 'Select board', id: NO_BOARD })
  const { execute, status, value: boards, error } = useAsync(boardsLoader, false)

  useEffect(() => {
    execute()
  }, [])

  useEffect(() => {
    if (boardId !== NO_BOARD && boards) setSelected(boards.find((b: Board) => b.id === boardId))
  }, [boards])

  const handleBoardSelection = (board: Board) => {
    if (boardId === NO_BOARD) dispatch({ type: ACTIONS.CHANGE_BOARD, payload: null })
    setBoardId(board.id)
    setBoardName(board.name)
    setSelected(board)
    dispatch({ type: ACTIONS.CHANGE_PAGE, payload: PAGE_RECORDER })
  }

  return (
    <section>
      <Header />
      <div className="flex flex-row items-center pb-2 mb-4 border-b-2 border-gray-200">
        <div className="flex-grow pr-4 overflow-hidden">
          <h2 className="h3">{boardName === NO_BOARD ? 'Select board' : 'Change board'}</h2>
        </div>
      </div>
      {status === 'error' && <div>{error}</div>}
      {status === 'pending' && <div>Loading...</div>}
      {status === 'success' && (
        <Listbox value={selected} onChange={handleBoardSelection}>
          <div className="relative mt-1">
            <Listbox.Button
              className={`relative w-full py-2 pl-3 pr-10 text-left rounded-lg shadow-md cursor-default
                focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white
                focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500
                text-base tracking-wide`}
            >
              <span className="block truncate">{selected.name}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="my-4">
                {boards.map((board: Board) => (
                  <Listbox.Option
                    key={board.id}
                    className={({ selected }) =>
                      `${selected ? 'border-miro-blue  text-gray-900' : 'border-gray-100 bg-miro-blue text-gray-100'}
                      border-2 cursor-default select-none relative py-2 pl-10 pr-4 rounded-md my-2 pointer`
                    }
                    value={board}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={`${selected ? 'font-medium' : 'font-normal'} font-semibold block truncate`}>
                          {board.name}
                        </span>
                        {selected ? (
                          <span
                            className={`${
                              active ? 'text-gray-700' : 'text-gray-900'
                            } absolute inset-y-0 left-0 flex items-center pl-3`}
                          >
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
    </section>
  )
}

export default BoardSelection
