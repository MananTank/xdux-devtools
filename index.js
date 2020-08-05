import React, { useState, useEffect } from 'react'
import { useFullStore } from '../react-xedux'
import SidePanel from './components/SidePanel/index.js'
import DetailsPanel from './components/DetailsPanel/index.js'
import { saveMutations, getMutations } from './helpers/localStorage'
import './xedux-devtools.css'
import hotReload from './helpers/hotReload'

const DevTools = ({ children }) => {
  const [mutations, setMutations] = useState(getMutations() || [])
  const [show, setShow] = useState(true)
  const [showDetails, setShowDetails] = useState(false)
  const [mutationIndex, setMutationIndex] = useState(null)
  const store = useFullStore()

  const handleActionClick = index => {
    if (mutationIndex === null || !showDetails) {
      setShowDetails(true)
      setMutationIndex(index)
    } else if (mutationIndex === index) {
      setShowDetails(!showDetails) // toggle if clicking on same snap
    } else {
      setMutationIndex(index)
    }
  }

  // subscribe a listener to store
  // whenever state is mutated, store the mutations in localstorage and in state
  // when listener is subscribed, load state
  useEffect(() => {
    const listener = mutation => {
      if (!mutation.synthetic) {
        setMutations(prev => {
          const newMutations = [...prev, mutation]
          saveMutations(newMutations)
          return newMutations
        })
      }
    }

    const unsub = store.subscribe(listener)
    hotReload(store) // only after subscribing, do the hotreload
    return unsub
    // eslint-disable-next-line
	}, []);

  const handleReset = () => {
    store.syntheticReset()
    setMutations([])
    saveMutations([])
  }

  return (
    <>
      <button
        type='text'
        className='toggle-xedux-devtools'
        onClick={() => setShow(!show)}> 🧐
      </button>

      <button
        type='text'
        className='clear-xedux-devtools'
        onClick={handleReset}> Clear Persisted state
      </button>

      {show ? (
        <div className='xedux-devtools'>
          <SidePanel mutations={mutations} onActionClick={handleActionClick} store={store}/>
          <DetailsPanel mutation={mutations[mutationIndex]} show={showDetails} />
          <div className='app-panel'>{children}</div>
          <div className='bottom-panel'> </div>
        </div>
      ) : (
        children
      )}
    </>
  )
}

export default DevTools
