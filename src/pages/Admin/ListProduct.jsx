import React, { useState,useEffect } from 'react'
import Modal from 'react-modal';

import { db } from '../../firebaseConfig'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query, 
  where,
  getDoc
} from "firebase/firestore";

import ProductCard from '../../components/ProductCard';
import { FiTrash2 } from 'react-icons/fi'
import { BsArrowLeft } from 'react-icons/bs'

Modal.setAppElement('#root');

const Home = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [selectedTipo, setSelectedTipo] = useState('salgado');
  const [nome, setNome] = useState();
  const [valor, setValor] = useState();
  const [descricao, setDescricao] = useState();
  const [tipo, setTipo] = useState();
  const [IDprodu, setIDprodu] = useState();
  const [imgProduto, setImgProduto] = useState();
  const [imgURL, setURL] = useState('')

  const openModal = async (e) => {
    
      const q = doc(db, "produtos", e.target.id);
      const querySnapshot = await getDoc(q);

      setNome(querySnapshot.data().nome);
      setValor(querySnapshot.data().valor);
      setDescricao(querySnapshot.data().descricao);
      setTipo(querySnapshot.data().tipo);
      setIDprodu(querySnapshot.id);
    setModalIsOpen(true);
  }


  const closeModal = () => {
    setModalIsOpen(false);
  }

  const deleteProdu = () => {
    console.log(IDprodu)
    
    deleteDoc(doc(db, 'produtos', IDprodu));
    setModalIsOpen(false);
    
    getUsers();
  }

  const editProdu = () => {
    console.log(IDprodu)
    
    updateDoc(doc(db, 'produtos', IDprodu), {
      nome: nome,
      valor: valor,
      descricao: descricao,
      tipo: tipo,
      url_img: downloadURL
    });

    setModalIsOpen(false);
   
    getUsers();
  }

  const handleChangeTipo = event => {
  setSelectedTipo(event.target.value);
  };

  const handleChangeTipoProdu = event => {
    setTipo(event.target.value);
  };

  const getUsers = async () => {
    const q = query(collection(db, "produtos"), where("tipo", "==", selectedTipo));
    const querySnapshot = await getDocs(q);
    setProdutos(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  };

  useEffect(() => {
    getUsers();
  }, [selectedTipo]);

  return (
    <div className='container w-full h-full mb-24 mx-auto'>
      <div className='text-center text-2xl m-4'>
        <h1>Admin - Produtos</h1>
      </div>
      <div className='w-11/12 mx-auto mb-4'>
        <select className='w-full bg-gray-100 text-gray-500 outline-none p-3 my-4 rounded-md' value={selectedTipo} onChange={handleChangeTipo}>
            <option value="salgado">salgado</option>
            <option value="bebida">bebida</option>
            <option value="doce">doce</option>
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
              btn_name={'editar'}
              onClick={openModal}
            />
          </>
        )
      })}
      <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Exemplo Modal"
            overlayClassName="bg-transparent fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center"
            className="w-[90%] max-w-[500px] bg-white p-6 rounded-md"

            >
             
      <div className='my-6 mx-auto px-4'>
        <div className='flex items-center justify-between mb-3'>
          <div>
            <h1 className='text-2xl'>Produto</h1>
          </div>
          <button
            className='bg-red-500 p-4 mt-3 mb-4 rounded-md text-white'
            type='button'
            onClick={deleteProdu}
          >
            <FiTrash2 size={20} />
          </button>
        </div>
      <form action="">
        <label htmlFor="">Nome do produto</label>
        <input className='w-full bg-gray-100 rounded-md outline-none p-4 mb-3' type="text" placeholder='Nome do produto' onChange={(e) => setNome(e.target.value)} value={nome}/>
        <select className='w-full bg-gray-100 text-gray-500 outline-none p-3 my-4 rounded-md'  onChange={handleChangeTipoProdu} value={tipo}>
            <option value="salgado">salgado</option>
            <option value="bebida">bebida</option>
            <option value="doce">doce</option>
          </select>
        <label htmlFor="">Preço</label>
        <input className='w-full bg-gray-100 rounded-md outline-none p-4 mb-3' type="number" placeholder='Preço do produto' onChange={(e) => setValor(e.target.value)} value={valor}/>
        <label htmlFor="">Descrição</label>
        <textarea className='w-full bg-gray-100 rounded-md outline-none p-4 mb-3 resize-none' type="text" placeholder='Descrição do produto' onChange={(e) => setDescricao(e.target.value)} value={descricao}></textarea>

        <button
          className='bg-zinc-800 p-4 rounded-md text-white w-full'
          type='button'
          onClick={editProdu}
        >
          Editar produto
        </button>
      </form>
      <button className='bg-zinc-900 text-white p-2 rounded-md mt-3' onClick={closeModal}>Fechar</button>
    </div>
    
      </Modal>
      </div>
    </div>
  )
}

export default Home