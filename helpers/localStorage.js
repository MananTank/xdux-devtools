const INIT_STATE = 'xedux-initial-state'
const MUTATIONS = 'xedux-mutations'

const set = (key, value) => {
  const string = JSON.stringify(value)
  localStorage.setItem(key, string)
}

const get = key => {
  const string = localStorage.getItem(key)
  return JSON.parse(string)
}

export const saveInitialState = initialState => {
  set(INIT_STATE, initialState)
}

export const saveMutations = mutations => {
  set(MUTATIONS, mutations)
}

export const getInitialState = () => get(INIT_STATE)
export const getMutations = () => get(MUTATIONS)
