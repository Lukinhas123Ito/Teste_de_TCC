import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { UserAuth } from '../../context/AuthContext';

import { BsGithub } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { useEffect } from 'react';

const SignUp = () => {
  const navigate = useNavigate();
  const { googleSignIn, githubSignIn, facebookSignIn, user, createUser } = UserAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn()
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleGithubSignIn = async () => {
    try {
      await githubSignIn()
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleFacebookSignIn = async () => {
    try {
      await facebookSignIn()
    }
    catch (err) {
      console.log(err);
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await createUser(email, password)
      navigate('/home')
    }
    catch(e) {
      setError(e.message)
      console.log(e.message)
    }
  }

  useEffect(() => {
    if(user != null) {
      navigate('/home')
    }
  }, [user])

  return (
    <>
    <div className='grid md:grid-cols-2'>
      <div className='w-full h-screen flex justify-center md:py-24 bg-white'>
        <div className='flex'>
          <div className='w-full'>
            <div className='max-w-[650px] h-[600px] md:h-[400px] mx-auto text-zinc-800 rounded-md'>
              <div className='max-w-[420px] mx-auto px-6 py-12'>

                <h1 className='text-xl text-center font-bold mb-3'>Crie uma conta</h1>
                  <p className='text-gray-400 mb-4'>Acesse a plataforma de compras da cantina da FATEC de Lins.</p>

                <div className='flex justify-center'>
                  {/* Login com google */}
                  <div className='flex justify-center mx-1'>
                    <button
                      onClick={handleGoogleSignIn}
                      className='p-4 border-2 rounded-full'
                      type='button'>
                      <FcGoogle size={20} />
                    </button>
                  </div>
                  {/* Login com Facebook */}
                  <div className='flex justify-center mx-1'>
                    <button
                      onClick={handleFacebookSignIn}
                      className='p-4 border-2 rounded-full'
                      type='button'>
                      <BsFacebook className='text-blue-700' size={20} />
                    </button>
                  </div>
                  {/* Login com github */}
                  <div className='flex justify-center mx-1'>
                    <button
                      onClick={handleGithubSignIn}
                      className='p-4 border-2 rounded-full'
                      type='button'>
                      <BsGithub size={20} />
                    </button>
                  </div>

                </div>


                <div className="flex justify-center items-center my-6 text-gray-300">
                  <div className="w-12 h-[1px] bg-gray-300"></div>
                  <p className='mx-2'>ou</p>
                  <div className="w-12 h-[1px] bg-gray-300"></div>
                </div>

                <div className='my-3'>
                  
                  <form onSubmit={handleSubmit}>
                    <input 
                      onChange={(e) => setEmail(e.target.value)} 
                      className='p-4 bg-gray-100 w-full rounded-md outline-none mb-5' 
                      type="text" 
                      placeholder='Email' 
                    />
                    <input 
                      onChange={(e) => setPassword(e.target.value)} 
                      className='p-4 bg-gray-100 w-full rounded-md outline-none mb-5' 
                      type="password"
                      placeholder='Senha'
                      current-password="password"
                    />

                    <button 
                      className='w-full p-4 bg-zinc-700 text-white font-semibold uppercase rounded-md' 
                      type='submit'
                    >
                      Entrar
                    </button>
                  </form>
                </div>

                <div className='flex mt-5 gap-2 items-center'>
                  <p className='text-gray-400'>
                  Já tem uma conta? 
                  </p>
                  <Link className='underline' to="/">
                    entrar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-zinc-800">

      </div>
    </div>
    </>
  )
}

export default SignUp