import * as React from 'react'
import { useState, useRef } from 'react'
import { MIRO_COLORS } from '../lib/constants'
import useOnClickOutside from '../lib/hooks/useOnClickOutside'

interface Props {
  currentColor: string
  setCurrentColor: React.Dispatch<React.SetStateAction<string>>
}

const ColorPicker: React.FC<Props> = ({ currentColor, setCurrentColor }) => {
  const [showPicker, setShowPicker] = useState(false)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setShowPicker(false))

  return (
    <div className="relative">
      {showPicker && (
        <ul
          ref={ref}
          className="absolute right-0 flex flex-row flex-wrap gap-2 p-3 bg-white rounded-md rounded-t-lg shadow-md -top-2 h-36 -mt-36 w-36"
        >
          {Object.entries(MIRO_COLORS).map(([k, v]) => (
            <li
              key={k}
              className={`${v.bg} inline-block w-6 h-6 border-2 border-gray-700 rounded-full pointer`}
              onClick={() => {
                setCurrentColor(k)
                setShowPicker(false)
              }}
            ></li>
          ))}
        </ul>
      )}
      <div
        className={`block w-6 h-6 mr-2 ${MIRO_COLORS[currentColor].bg} border-2 border-gray-700 rounded-full`}
        onClick={() => {
          setShowPicker(!showPicker)
        }}
      ></div>
    </div>
  )
}

export default ColorPicker
