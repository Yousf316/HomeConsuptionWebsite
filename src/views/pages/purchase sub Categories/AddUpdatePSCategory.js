import StoreForm from '../../../components/Store/StoreForm'
import React from 'react'
import { useParams } from 'react-router-dom'
import Purchase_SubCategories from '../../../components/Purchase_SubCategories/Purchase_SubCategories'

const AddUpdatePSCategory = () => {
  const { id } = useParams()

  return (
    <>
      <Purchase_SubCategories id={id}/>
    </>
  )
}

export default AddUpdatePSCategory
