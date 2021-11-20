import { createContext, Dispatch } from 'react'
import { initialState } from './reducer'

export const GlobalContext = createContext<[State, Dispatch<Action>]>([initialState, () => null])

export default GlobalContext
