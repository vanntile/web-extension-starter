import * as React from 'react'
import { MainComponent } from '../components'
import GlobalContext from '../lib/context'
import { reducer, initialState } from '../lib/reducer'

const Popup: React.FC = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  return (
    <GlobalContext.Provider value={[state, dispatch]}>
      <MainComponent />
    </GlobalContext.Provider>
  )
}

export default Popup
