import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';

import { BsArrowLeft } from 'react-icons/bs'

const index = () => {
  const { logOut, user } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logOut();
      navigate('/');
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    
    <div className='container w-full h-screen mb-12 md:mb-0 mx-auto px-4'>
      <button
        onClick={() => navigate(-1)}
        className='bg-zinc-800 text-white p-4 rounded-md my-4'
      >
        <BsArrowLeft size={20} />
      </button>
      <h1 className='text-center text-2xl font-bold md:my-12'>Perfil</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className='bg-gray-300 p-8 flex flex-col items-center rounded-md'>
          {user.photoURL && <img className='rounded-full w-32 h-32' src={user.photoURL} alt="/" />}
          <h1 className='text-zinc-700 font-semibold text-2xl mt-6 mb-2'>{user.displayName}</h1>
          <p className='text-gray-400 text-sm'>{user.email}</p>
          <button onClick={handleSignOut} className='bg-gray-100 rounded-md py-2 px-5 mt-10'>Sair</button>
          <Link className='bg-gray-100 mt-4 p-2 rounded-md' to='/admin'>
            Administrador
          </Link>
        </div>
        <div className="md:col-span-2 p-4 bg-gray-300 rounded-md">
          <div className='flex justify-center'>
            <h1 className='text-2xl font-semibold text-zinc-700 mb-6'>Histórico</h1>
          </div>
          <div className="flex flex-col items-center">
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
    </div>
  )
}

export default index