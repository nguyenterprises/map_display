import React from 'react'
import state from '../../../store'

const messageStyles = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '3em 4em',
  backgroundColor: 'rgba(255, 255, 255,.87)',
  borderRadius: '5px',
  backdropFilter: 'blur(8px)',
  border: '4px solid rgba(25, 54, 148, .8)',
}
const closeMessageButton = {
  position: 'absolute',
  top: '0',
  right: '0',
}


export const SubmittedMessage = () =>  {
  return (
    <div style={messageStyles}>
      <div>Request submitted. Thank you.</div>
      <button style={closeMessageButton} onClick={()=> state.messageSubmitted = false}>X</button>
    </div>
  )
}