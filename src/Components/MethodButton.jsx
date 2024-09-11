import React from 'react'

const MethodButton = ({btnMethod, label}) => {
  return (
    <button
        className="btnShow showMore"
        onClick={btnMethod}
      >
    {label}
    </button>
  )
}

export default MethodButton
