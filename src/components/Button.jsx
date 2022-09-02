import React from 'react'

const Button = ({ name, type, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className='bg-zinc-700 text-white p-2 rounded-md'
    >
      {name}
    </button>
  )
}

export default Button