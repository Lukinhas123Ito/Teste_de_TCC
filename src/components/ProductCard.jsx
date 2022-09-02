import React from 'react'


const ProductCard = ( productCard ) => {
  return (
    <>
    <div className='bg-gray-300 max-w-[380px] h-full flex mx-auto rounded-md p-2'>
      <img className='rounded-md m-4 w-28 h-28' src={productCard.url_image} alt="/" />
      <div className='w-full mt-4'>
        <div className='flex items-center justify-between w-full px-2'>
          <h1>{productCard.name}</h1>
        </div>
        <p className='px-2 my-3'>{productCard.description}</p>
        <div className='flex w-full items-center justify-between'>
          <p className='font-semibold'>{productCard.price}</p>
          <button
            type={productCard.type}
            onClick={productCard.onClick}
            className='bg-zinc-700 text-white p-2 rounded-md flex items-center gap-1'
            id={productCard.id}
          >
            {productCard.btn_name}
            {productCard.btn_icon}
          </button>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default ProductCard