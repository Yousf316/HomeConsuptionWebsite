import StoreForm from '../../../components/Store/StoreForm'
import React from 'react'
import { useParams } from 'react-router-dom'

const AddUpdateStore = () => {
  const { id } = useParams()

  return (
    <>
      <StoreForm id={id}/>
    </>
  )
}

export default AddUpdateStore
