import React from 'react'
import './details.css'

const Code = ({ code }) => {
  return (
    <code>
      <pre> {JSON.stringify(code, undefined, 3)}</pre>
    </code>
  )
}

const Diff = ({ oldState, newState }) => {
  return (
    <div className='diff'>
      <div className='state-info'>
        <div className='subtitle'> Before </div>
        <Code code={oldState} />
      </div>
      <div className='state-info'>
        <div className='subtitle'> After </div>
        <Code code={newState} />
      </div>
    </div>
  )
}

const Details = ({ show, mutation }) => {
  return (
    show && (
      <div className='details-panel with-scroll'>
        <div className='type detail'>
          <div className='label'> ACTION TYPE </div>
          <div>{mutation.actionType} </div>
        </div>
        <div className='data detail'>
          <div className='label'> ACTION DATA </div>
          <div> {JSON.stringify(mutation.actionData)} </div>
        </div>
        <div className='component detail'>
          <div className='label'> DISPATCHED FROM </div>
          <div>{`< ${mutation.component} />`} </div>
        </div>
        {Object.keys(mutation.updatedSlices).map(key => (
          <div className='updated-key' key={key}>
            <div className='updated-slice-name'> 🍕 {key} </div>
            <Diff
              oldState={mutation.updatedSlices[key].oldState}
              newState={mutation.updatedSlices[key].newState}
            />
          </div>
        ))}
      </div>
    )
  )
}

export default Details
