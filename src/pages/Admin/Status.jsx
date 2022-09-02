import React from 'react'
import { useNavigate } from 'react-router-dom'

import { BsArrowLeft } from 'react-icons/bs'

const Status = () => {
  const navigate = useNavigate();

  return (
    <div className="container w-full h-screen mb-12 md:mb-0 mx-auto">
      <button
        onClick={() => navigate(-1)}
        className='bg-zinc-800 text-white p-4 rounded-md m-4'
      >
        <BsArrowLeft size={20} />
      </button>
      <div className='w-[400px] md:w-2/4 mb-6 md:mb-0 mx-auto px-4'>
        <div className="flex flex-col my-3">
          <h1 className='text-2xl'>Pendente</h1>
          <div className="bg-gray-100 w-full p-3 rounded-md my-3">
            <h1>teste</h1>
          </div>
          <div className="bg-gray-100 w-full p-3 rounded-md my-3">
            <h1>teste</h1>
          </div>
          <div className="bg-gray-100 w-full p-3 rounded-md my-3">
            <h1>teste</h1>
          </div>
        </div>
        <div className="flex flex-col my-3">
          <h1 className='text-2xl'>Em processo</h1>
          <div className="bg-gray-100 w-full p-3 rounded-md my-3">
            <h1>teste</h1>
          </div>
          <div className="bg-gray-100 w-full p-3 rounded-md my-3">
            <h1>teste</h1>
          </div>
          <div className="bg-gray-100 w-full p-3 rounded-md my-3">
            <h1>teste</h1>
          </div>
        </div>
        <div className="flex flex-col my-3">
          <h1 className='text-2xl'>Finalizado</h1>
          <div className="bg-gray-100 w-full p-3 rounded-md my-3">
            <h1>teste</h1>
          </div>
          <div className="bg-gray-100 w-full p-3 rounded-md my-3">
            <h1>teste</h1>
          </div>
          <div className="bg-gray-100 w-full p-3 rounded-md my-3">
            <h1>teste</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Status