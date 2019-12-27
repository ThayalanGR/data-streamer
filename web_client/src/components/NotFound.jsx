import React from 'react'

export default function NotFound() {
  return (
    <div className="font-weight-bold h3 text-danger d-flex justify-content-center align-items-center" style={{width: '100vw', height: '90vh', maxWidth: '100vw', maxHeight: '100vh', overflowX: 'hidden', overflowY: 'hidden'}}>
       <div> Requested page not found on our server !</div>
    </div>
  )
}
