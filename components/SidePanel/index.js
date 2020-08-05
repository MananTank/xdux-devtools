import React, { useState } from 'react'
import './sidepanel.css'
import timeTravel from '../../helpers/timeTravel'

const Sidepanel = ({ mutations, onActionClick, store }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const handleActionClick = index => {
    if (selectedIndex === index) {
      setSelectedIndex(-1)
    } else {
      setSelectedIndex(index)
    }

    onActionClick(index)
  }

  const handleJump = index => {
    store.syntheticReset()
    timeTravel(store, mutations, index)
  }

  return (
    <div className='side-panel'>
      <div className='side-panel__title'> Actions </div>
      <div className='action-types'>
        {mutations.map((snap, index) => (
          <div className={`action ${selectedIndex === index ? 'active' : ''}`} key={index}>
            <div key={index} className='action-type' onClick={() => handleActionClick(index)}>
              {snap.actionType}
            </div>
            <button
              className='jump xedux-btn'
              onClick={() => handleJump(index)}>
              jump
            </button>
            <button className='skip xedux-btn'> skip </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidepanel
