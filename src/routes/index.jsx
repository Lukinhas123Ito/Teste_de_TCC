import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'

import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'


import Account from '../pages/Account'
import Notification from '../pages/Notification'
import Cart from '../pages/Cart'

import Admin from '../pages/Admin'

import Status from '../pages/Admin/Status'
import ListProduct from '../pages/Admin/ListProduct'
import CreateProduct from '../pages/Admin/CreateProduct'


import WithoutNav from '../components/WithoutNav'
import WithNav from '../components/WithNav'

import Protected from '../components/Protected'

 export default () => {
  return (
    <>
      <Routes>
        <Route element={<WithoutNav />}>
          <Route exact path="/" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
        </Route>
        <Route element={<WithNav />}>
          <Route exact path='/home' element={<Protected><Home /></Protected>} />
          <Route exact path='/account' element={<Protected><Account /></Protected>} />
          <Route exact path='/notification' element={<Notification />} />
          <Route exact path='/cart' element={<Protected><Cart /></Protected>} />
          <Route exact path='/admin' element={<Protected><Admin /></Protected>} />
          <Route exact path='/admin/status' element={<Protected><Status /></Protected>} />
          <Route exact path='/admin/create' element={<Protected><CreateProduct /></Protected>} />
          <Route exact path='/admin/product' element={<Protected><ListProduct /></Protected>} />
        </Route>
      </Routes>
    </>
  )
}
