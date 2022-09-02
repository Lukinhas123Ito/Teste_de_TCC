import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'

import { useNavigate, Link } from 'react-router-dom'

const Admin = () => {
  const navigate = useNavigate()

  return (
    <div className='container w-full h-screen mx-auto'>
        <button
          onClick={() => navigate(-1)}
          className='bg-zinc-800 text-white p-4 rounded-md m-4'
        >
          <BsArrowLeft size={20} />
        </button>

      <div className='flex flex-col items-center my-10'>
        <ul>
          <li className='bg-gray-100 p-4 rounded-md my-2 text-zinc-700 text-xl text-center'>
            <Link to='status'>
              Status pedidos
            </Link>
          </li>
          <li className='bg-gray-100 p-4 rounded-md my-2 text-zinc-700 text-xl text-center'>
            <Link to='create'>
              Cadastrar produtos
            </Link>
          </li>
          <li className='bg-gray-100 p-4 rounded-md my-2 text-zinc-700 text-xl text-center'>
            <Link to='product'>
              Editar/Remover produtos
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Admin