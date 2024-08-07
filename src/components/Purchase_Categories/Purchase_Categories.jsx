import React, { useEffect, useState, useContext } from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { Box, Button } from '@mui/material'
import Styles from './Purchase_CategoriesFormStyles.module.css'

import TransitionAlerts from '../Alert'
import {
  GetPurchase_Category,
  AddNewPurchase_Category,
  SetUpdatePurchase_Categories,

} from '../../Api/Purchase_CategoriesApi'
import { UserContext } from '../../Global/user'

export default function Purchase_CategoryForm({ id }) {
  const [IsAddNew, setIsAddNew] = useState(true)
  const Userinfo = useContext(UserContext)

  const [PCategoryInfo, setPCategoryInfo] = useState({
    pCategoryID: 'لا يوجد',
    categoryName: '',
  })

  function SetPCategoryInfo(PCategoryInfo) {
    setPCategoryInfo((previnfo) => ({
      ...previnfo,
      pCategoryID: id,
      categoryName: PCategoryInfo.categoryName,
    }))
    setIsAddNew(false)
  }

  function resetPageValue() {
    setPCategoryInfo((previnfo) => ({
      ...previnfo,
      pCategoryID: 'لا يوجد',
      categoryName: '',
    }))
    setIsAddNew(true)
  }
  function ChangeNameValue(Name) {
    setPCategoryInfo({ ...PCategoryInfo, categoryName: Name })
  }

  async function GetPCategoryInfo() {
    const PCategoryInfo = await GetPurchase_Category(id)
    PCategoryInfo.status ? resetPageValue() : SetPCategoryInfo(PCategoryInfo)
  }
  async function InsertNewPCategory() {
    console.log(PCategoryInfo)

    const newCategory = {
      categoryName: PCategoryInfo.categoryName,
      createdByUserID: Userinfo.userInfo.UserID,
    }
    const CategoryInfo = await AddNewPurchase_Category(newCategory)
    window.location.hash = `/home/Purchase_Category/${CategoryInfo.pCategoryID}`

    return true
  }
  async function UpdatePCategory() {
    const UpdatePCategoryInfo = {
      pCategoryID: id,
      categoryName: PCategoryInfo.categoryName,
      updatedByUserID: Userinfo.userInfo.UserID,
    }
    const CategoryInfo = await SetUpdatePurchase_Categories(UpdatePCategoryInfo, PCategoryInfo.pCategoryID)
    return true
  }
  useEffect(() => {
    resetPageValue()
    if (id != 0) {
      GetPCategoryInfo()
    }
  }, [id])
  async function SaveOpreation() {
    if ((await IsValidInfo()) != true) {
      return false
    }

    if (IsAddNew) {
      if (await InsertNewPCategory()) {
        return true
      } else {
        return false
      }
    } else {
      if (await UpdatePCategory()) {
        return true
      } else {
        return false
      }
    }
  }

  async function IsValidInfo() {
    if (PCategoryInfo.categoryName.trim() == '') return false

    return true
  }
  return (
    <>
      <Form className={Styles['Save-form-main']}>
        <Form.Group as={Row} controlId="formPlaintextStoreID">
          <Form.Label column sm="2" style={{ minWidth: '150px' }}>
            رقم الصنف :
          </Form.Label>
          <Col sm="3">
            <Form.Control
              sm="2"
              value={PCategoryInfo.pCategoryID}
              plaintext
              readOnly
              defaultValue="لا يوجد"
            />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          style={{ marginTop: '50px', marginBottom: '25px' }}
          controlId="formPlaintextStoreName"
        >
          <Form.Label column sm="2" style={{ minWidth: '150px' }}>
            اسم الصنف :
          </Form.Label>
          <Col sm="3">
            <Form.Control
              value={PCategoryInfo.categoryName}
              onChange={(e) => ChangeNameValue(e.target.value)}
              sm="2"
              type="text"
              placeholder="اسم الصنف"
              style={{ minWidth: '250px' }}
            />
          </Col>
        </Form.Group>
      </Form>
      <FormSave SaveOpreation={SaveOpreation} />
    </>
  )
}

function FormSave({ SaveOpreation }) {
  const [openAlert, setopenAlert] = React.useState(false)
  const [severityType, setseverityType] = React.useState('')
  const [MessageAlert, setMessageAlert] = React.useState('')
  return (
    <>
      <Form className={Styles['Save-form-main']}>
        <div>
          <Button variant="outlined" style={{ minWidth: '150px', margin: '25px' }}>
            الغاء
          </Button>
          <Button
            variant="contained"
            style={{ minWidth: '150px', margin: '25px' }}
            onClick={async () => {
              if (await SaveOpreation()) {
                setseverityType('success')
                setMessageAlert('تمت العملية بنجاح')
              } else {
                setseverityType('error')
                setMessageAlert('فشلت العملية')
              }
              setopenAlert(true)
            }}
          >
            حفظ
          </Button>
        </div>
      </Form>
      <TransitionAlerts
        open={openAlert}
        setOpen={setopenAlert}
        Message={MessageAlert}
        severityType={severityType}
      />
    </>
  )
}
