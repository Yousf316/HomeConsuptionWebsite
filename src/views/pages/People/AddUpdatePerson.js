import React from 'react'
import { useParams } from 'react-router-dom'
import PeopleForm from '../../../components/People/PeopleForm'

const AddUpdatePerson = () => {
  const { id } = useParams()

  return (
    <>
      <PeopleForm id={id} />
    </>
  )
}

export default AddUpdatePerson
