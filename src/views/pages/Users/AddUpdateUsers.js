import React from 'react'
import { useParams } from 'react-router-dom'
import UsersForm from '../../../components/Users/UsersForm'

const AddUpdateStore = () => {
  const { id } = useParams()

  return (
    <>
      <UsersForm id={id} />
    </>
  )
}

export default AddUpdateStore
