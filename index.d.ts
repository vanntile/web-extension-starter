declare var miroBoardsPicker: any


interface State {
  page: string
}

interface Action {
  type: string
  payload: any
}
interface Board {
  id: string
  name: string
}

interface MiroColor {
  name: string
  bg: string
  color: string
}

interface MiroColors {
  [key: string]: MiroColor
}
