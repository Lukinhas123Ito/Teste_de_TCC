import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { BsArrowLeft } from 'react-icons/bs'
import { BiImageAdd } from 'react-icons/bi'
import { FaWindowClose } from 'react-icons/fa'
import {db, storage} from '../../firebaseConfig'
import { collection, addDoc, QuerySnapshot } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";



const CreateProduct = () => {
  const navigate = useNavigate();

  const [imgPreview, setImgPreview] = useState(null);
  const [error, setError] = useState(false);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [selectedTipo, setSelectedTipo] = useState('salgado');
  const [imgURL, setURL] = useState('')
  const [imgProduto, setImgProduto] = useState();
  const [progresssPorcent, setProgressPorcent] = useState(0)

  const handleupload = (event) => {
    event.preventDefault()
   
    const file = imgProduto;
    if(!file){
      return
    }
    const storageRef = ref(storage, `produtosimg/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on("state_changed",
    (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgressPorcent(progress);
      },
      (error) => {alert(error);},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          cadastrarProduto(downloadURL);
        });
      },
    );
  };

  function cadastrarProduto(downloadURL){
    console.log('t2');
    try {
      const docRef = addDoc(collection(db, "produtos"), {
        nome: nome,
        valor: valor,
        descricao: descricao,
        tipo: selectedTipo,
        url_img: downloadURL
      });
      setNome('');
      setValor('');
      setDescricao('');
    
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    
  }

  const handleImageChange = (e) => {
    const selected = e.target.files[0]
    setImgProduto(e.target.files[0])
    const ALLOWED_TYPES = ["image/png", "image/jpg", "image/jpeg"];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result)
      }
      reader.readAsDataURL(selected)

    } else {
      console.log("arquivo não suportado")
    }
  }

  
 

  const handleChange = event => {
    setSelectedTipo(event.target.value);
  };

  return (
    <div className='container w-full h-screen mx-auto'>
      <button
        onClick={() => navigate(-1)}
        className='bg-zinc-800 text-white p-4 rounded-md m-4'
      >
        <BsArrowLeft size={20} />
      </button>
      <div className='w-[400px] md:w-2/4 h-screen my-6 mx-auto p-2 rounded-md'>
        <h1 className='text-center text-2xl font-semibold md:my-6 mb-6'>Cadastrar produto</h1>
        <form className='px-4'onSubmit={handleupload}>

          {error && <p className='text-red-500 p-3'>Arquivo não suportado</p>}

          <div
            className='relative w-[150px] h-[150px] rounded-md flex flex-col items-center justify-center text-center text-white my-3'
            style={{
              background: imgPreview ? `url("${imgPreview}") no-repeat center/cover` : '#999'
            }}
          >
          {!imgPreview && (
            <BiImageAdd className='text-2xl' />
          )}
          {imgPreview && 
            <button className='text-sm' onClick={() => setImgPreview(null)}>
              Remover imagem
            </button>}
          </div>
          {!imgPreview && (
              <>
                <label className='text-gray-500 flex gap-2 items-center w-full bg-gray-100 rounded-md outline-none p-4 mb-5' htmlFor="input">
                  <BiImageAdd size={20} />
                  Imagem do produto
                </label>
                <input onChange={handleImageChange} id='input' className='hidden w-full bg-gray-100 rounded-md outline-none p-4 mb-3' type="file" />
              </>
            )}
          <label className='text-gray-500' htmlFor="name">Nome do produto</label>
          <input id='name' className='w-full bg-gray-100 rounded-md outline-none p-4 mb-3' type="text" placeholder='Nome do produto'  onChange={(e) => setNome(e.target.value)}  value={nome}/>
          <label className='text-gray-500' htmlFor="name">Tipo do produto</label>
          <select className='w-full bg-gray-100 text-gray-500 outline-none p-3 my-4 rounded-md' value={selectedTipo} onChange={handleChange}>
            <option value="salgado" >Salgado</option>
            <option value="bebida" >Bebida</option>
            <option value="doce" >Doce</option>
          </select>
          <label className='text-gray-500' htmlFor="price" >Preço</label>
          <input id='price' className='w-full bg-gray-100 rounded-md outline-none p-4 mb-3' type="number" placeholder='Preço do produto' onChange={(e) => setValor(e.target.value)} value={valor} />
          <label className='text-gray-500' htmlFor="description">Descrição</label>
          <textarea id='description' className='w-full bg-gray-100 rounded-md outline-none p-4 mb-3 resize-none' type="text" placeholder='Descrição do produto'  onChange={(e) => setDescricao(e.target.value)}  value={descricao}>

          </textarea>

          <button
            className='bg-zinc-800 p-4 rounded-md text-white w-full'
            type='submit'
          >
            Cadastrar produto
          </button>
        </form>
        <div className='text-center my-3'>
          {!imgURL && <p>{progresssPorcent}%</p>}
        </div>
      </div>
    </div>
  )
}

export default CreateProduct