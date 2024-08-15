import React from 'react'
import { useParams } from 'react-router-dom'
import ProductCategoryForm from '../../../components/ProductCategory/ProductCategoryForm'

const AddUpdateProduct = () => {
  const { id } = useParams()

  return (
    <>
      <ProductCategoryForm id={id}/>
    </>
  )
}

export default AddUpdateProduct
