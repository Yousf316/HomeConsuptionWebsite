import StoreForm from '../../../components/Store/StoreForm'
import React from 'react'
import { useParams } from 'react-router-dom'
import Purchase_CategoryForm from '../../../components/Purchase_Categories/Purchase_Categories'

const AddUpdatePCategory = () => {
  const { id } = useParams()

  return (
    <>
      <Purchase_CategoryForm id={id}/>
    </>
  )
}

export default AddUpdatePCategory
