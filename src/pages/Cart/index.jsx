import React, { useState,useEffect } from 'react'
import ProductCard from '../../components/ProductCard';
import { BsCartPlus } from 'react-icons/bs'

import { db } from '../../firebaseConfig'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query, 
  where
} from "firebase/firestore";
const Cart = () => {
  return (
    <div className='text-center text-2xl m-4'>
      {produtos.map(produ => {
        return (
          <>
            <ProductCard
              key={produ.id}
              name={produ.nome}
              description={produ.descricao}
              price={'R$'+produ.valor}
              url_image={produ.url_img}
              id={produ.id}
              btn_name={'Adicionar'}
              btn_icon={<BsCartPlus />}
              onClick={adicionarProduto}
            />
          </>
        )
      })}
    </div>
  )
}

export default Cart