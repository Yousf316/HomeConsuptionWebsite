import React, { useEffect, useState, useContext } from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { Box, Button } from '@mui/material'
import Styles from './Purchase_SubCategoriesFormStyles.module.css'

import TransitionAlerts from '../Alert'
import {
  GetPurchase_SubCategory,
  AddNewPurchase_SubCategory,
  UpdatePurchase_SubCategory,
} from '../../Api/Purchase_SubCategoriesApi'
import { UserContext } from '../../Global/user'
import { GetPurchase_CategoriesTable } from '../../Api/Purchase_CategoriesApi'

export default function Purchase_SubCategoryForm({ id }) {
  const [IsAddNew, setIsAddNew] = useState(true)
  const Userinfo = useContext(UserContext)
  const [Categories, setCategories] = useState([])
  const [Category, setCategory] = useState(1)

  const [PCategoryInfo, setPCategoryInfo] = useState({
    psCategoryID: 'لا يوجد',
    subCategoryName: '',
  })

  function SetPCategoryInfo(PCategoryInfo) {
    setPCategoryInfo((previnfo) => ({
      ...previnfo,
      psCategoryID: id,
      subCategoryName: PCategoryInfo.subCategoryName,
    }))
    setIsAddNew(false)
  }
  async function GetPCategories() {
    const dataTable = await GetPurchase_CategoriesTable()
    setCategories(dataTable)
  }
  function resetPageValue() {
    setPCategoryInfo((previnfo) => ({
      ...previnfo,
      psCategoryID: 'لا يوجد',
      subCategoryName: '',
    }))
    setIsAddNew(true)
  }
  function ChangeNameValue(Name) {
    setPCategoryInfo({ ...PCategoryInfo, subCategoryName: Name })
  }

  async function GetPSCategoryInfo() {
    const PCategoryInfo = await GetPurchase_SubCategory(id)
    PCategoryInfo.status ? resetPageValue() : SetPCategoryInfo(PCategoryInfo)
  }
  async function InsertNewPCategory() {
    console.log(PCategoryInfo)

    const newCategory = {
      subCategoryName: PCategoryInfo.subCategoryName,
      createdByUserID: Userinfo.userInfo.UserID,
    }
    const CategoryInfo = await AddNewPurchase_SubCategory(newCategory)
    window.location.hash = `/home/Purchase_Category/${CategoryInfo.psCategoryID}`

    return true
  }
  async function UpdatePCategory() {
    const UpdatePCategoryInfo = {
      psCategoryID: id,
      subCategoryName: PCategoryInfo.subCategoryName,
      updatedByUserID: Userinfo.userInfo.UserID,
    }
    const CategoryInfo = await UpdatePurchase_SubCategory(
      UpdatePCategoryInfo,
      PCategoryInfo.psCategoryID,
    )
    return true
  }
  useEffect(() => {
    resetPageValue()
    if (id != 0) {
      GetPSCategoryInfo()
    }
  }, [id])
  useEffect(() => {
    GetPCategories()
  }, [])
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
  function handleChangeSelectPurchaseCategories(e) {
    setCategory(e.target.value)
  }
  async function IsValidInfo() {
    if (PCategoryInfo.subCategoryName.trim() == '') return false

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
              value={PCategoryInfo.psCategoryID}
              plaintext
              readOnly
              defaultValue="لا يوجد"
            />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          style={{ marginTop: '50px', marginBottom: '25px' }}
          controlId="formSelectPurchaseCategories"
          onChange={handleChangeSelectPurchaseCategories}
        >
          <Form.Label column sm="2" style={{ minWidth: '150px' }}>
            الصنف الرئيسية
          </Form.Label>
          <Col sm="3">
            <Form.Select
              aria-label="select Purchase Type"
              value={Category}
              style={{ minWidth: '250px' }}
              onChange={(e) => setCategory(e.target.value)}
            >
              {Categories.map((category) => (
                <option value={category.PCategoryID} key={category.PCategoryID}>
                  {category.CategoryName}
                </option>
              ))}
            </Form.Select>
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
              value={PCategoryInfo.subCategoryName}
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
