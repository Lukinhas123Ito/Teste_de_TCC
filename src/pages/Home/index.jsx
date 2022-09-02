import React, { useState,useEffect } from 'react'
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

import ProductCard from '../../components/ProductCard';

const Home = () => {
  const [active, setActive] = useState(0);
  const [produtos, setProdutos] = useState([]);
  const [produtoSelected, setprodutoSelected] = useState([]);

  const [selectedTipo, setSelectedTipo] = useState('salgado');

  const adicionarProduto = (event) => {
    setprodutoSelected(event.target.id);
    
    console.log(event.target.id)
  }

  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  useEffect(() => {
    const getUsers = async () => {
      const q = query(collection(db, "produtos"), where("tipo", "==", selectedTipo));
      const querySnapshot = await getDocs(q);
      setProdutos(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    };
    getUsers();

  }, [selectedTipo]);

console.log(produtos);
const handleChangeTipo = event => {
  setSelectedTipo(event.target.value);
};
  
  return (
    <div className='container w-full h-full mb-24 mx-auto'>
      <div className='text-center text-2xl m-4'>
        <h1>Inicio</h1>
      </div>
      <div className='w-11/12 mx-auto mb-4'>
        <select className='w-full bg-gray-100 text-gray-500 outline-none p-3 my-4 rounded-md' value={selectedTipo} onChange={handleChangeTipo}>
            <option value="salgado">Salgado</option>
            <option value="bebida">Bebida</option>
            <option value="doce">Doce</option>
        </select>
      </div>
      <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mx-2'>
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
    </div>
  )
}

export default Home