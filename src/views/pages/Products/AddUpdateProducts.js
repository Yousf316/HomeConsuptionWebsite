import React from 'react'
import { useParams } from 'react-router-dom'
import ProductForm from '../../../components/Products/ProductForm'

const AddUpdateProduct = () => {
  const { id } = useParams()

  return (
    <>
      <ProductForm id={id}/>
    </>
  )
}

export default AddUpdateProduct
