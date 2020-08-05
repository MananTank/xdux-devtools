import timeTravel from './timeTravel'
import { getMutations } from './localStorage'

const hotReload = (store) => {
  timeTravel(store, getMutations())
}
export default hotReload
