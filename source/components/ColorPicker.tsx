import * as React from 'react'
import { MIRO_COLORS } from '../lib/constants'

interface Props {
  currentColor: string
  setCurrentColor: React.Dispatch<React.SetStateAction<string>>
}

const ColorPicker: React.FC<Props> = ({ currentColor }) => {
  return (
    <div className={`block w-6 h-6 mr-2 ${MIRO_COLORS[currentColor].bg} border-2 border-gray-500 rounded-full`}></div>
  )
}

export default ColorPicker
