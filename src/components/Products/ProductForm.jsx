import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { Box, Button } from '@mui/material'
import Styles from './ProductForm.module.css'

import TransitionAlerts from '../Alert'
import { GetItemsInfo, SetNewProduct, SetUpdateProduct } from '../../Api/ItemsApi'
import { GetProductCategories } from '../../Api/ProductCategories'

export default function ProductForm({ id }) {
  const [IsAddNew, setIsAddNew] = useState(true)
  const [ProductInfo, setProductInfo] = useState({
    ItemID: 'لا يوجد',
    itemName_AR: '',
    itemName_EN: '',
    imagePath: '',
    categoryID: -1,
    price: 0,
  })
  const [ProductCategories, setProductCategories] = useState([])

  function SetProductInfo(ProductInfo) {
    setProductInfo((previnfo) => ({
      ...previnfo,
      ItemID: id,
      itemName_AR: ProductInfo.itemName_AR,
      itemName_EN: ProductInfo.itemName_EN,
      imagePath: ProductInfo.imagePath,
      categoryID: ProductInfo.categoryID,
      price: ProductInfo.price,
    }))
    setIsAddNew(false)
  }

  async function GetProductCategoriesTable() {
    const dt = await GetProductCategories()
    setProductCategories(dt)
  }

  async function resetPageValue() {
    console.log('hi')

    GetProductCategoriesTable()
    setProductInfo((previnfo) => ({
      ...previnfo,
      ItemID: 'لا يوجد',
      itemName_AR: '',
      itemName_EN: '',
      imagePath: '',
      categoryID: -1,
      price: 0,
    }))
    setIsAddNew(true)
  }
  function ChangeitemName_ARValue(Name) {
    setProductInfo({ ...ProductInfo, itemName_AR: Name })
  }
  function ChangeCategoryIdValue(CategoryID) {
    setProductInfo({ ...ProductInfo, categoryID: CategoryID })
  }

  function ChangepProductPriceValue(price) {
    setProductInfo({ ...ProductInfo, price: price })
  }

  function ChangeitemName_ENValue(Name) {
    setProductInfo({ ...ProductInfo, itemName_EN: Name })
  }
  async function GetProductINfo() {
    const Productinfo = await GetItemsInfo(id)
    Productinfo.status ? resetPageValue() : SetProductInfo(Productinfo)
  }
  async function InsertnewProduct() {
    const newProduct = {
      itemName_AR: ProductInfo.itemName_AR,
      itemName_EN: ProductInfo.itemName_EN,
      imagePath: ProductInfo.imagePath,
      categoryID: ProductInfo.categoryID,
      price: ProductInfo.price,
    }
    const Productinfo = await SetNewProduct(newProduct)
    if (Productinfo.status != null) return false

    window.location.hash = `/home/ProductOperation/${storeNameInfoByName[0].StoreID}`
    return true
  }
  async function UpdateProduct() {
    const UpdateProductInfo = {
      itemName_AR: ProductInfo.itemName_AR,
      itemName_EN: ProductInfo.itemName_EN,
      imagePath: ProductInfo.imagePath,
      categoryID: ProductInfo.categoryID,
      price: ProductInfo.price,
    }
    const Productinfo = await SetUpdateProduct(UpdateProductInfo, ProductInfo.itemID)
    return Productinfo.status == null ? true : false
  }
  useEffect(() => {
    resetPageValue()
    if (id != 0) {
      GetProductINfo()
    }
  }, [id])

  function handleChangeSelectPurchaseCategories(e) {
    setCategory(e.target.value)
  }

  async function SaveOpreation() {
    if ((await IsValidInfo()) != true) {
      return false
    }

    if (IsAddNew) {
      if (await InsertnewProduct()) {
        return true
      } else {
        return false
      }
    } else {
      if (await UpdateProduct()) {
        return true
      } else {
        return false
      }
    }
  }

  async function IsValidInfo() {
    if (ProductInfo.storeName.trim() == '') return false

    if (IsAddNew) {
      const storeNameInfo = await GetStoreByName(ProductInfo.storeName)
      if (storeNameInfo.status != null) {
        return true
      } else {
        return false
      }
    }

    return true
  }
  return (
    <>
      <Form className={Styles['Save-form-main']}>
        <Form.Group style={{ marginBottom: '30px' }} as={Row} controlId="formPlaintextStoreID">
          <Form.Label column sm="2" style={{ minWidth: '150px' }}>
            رقم المنتج :
          </Form.Label>
          <Col sm="3">
            <Form.Control
              sm="2"
              value={ProductInfo.ItemID}
              plaintext
              readOnly
              defaultValue="لا يوجد"
            />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          style={{ marginTop: '50px', marginBottom: '25px' }}
          controlId="formPlaintextImageProduct"
        >
          <Form.Label column sm="2" style={{ minWidth: '150px' }}>
            صورة المنتج (اختياري) :
          </Form.Label>
          <Col sm="3">
            <Form.Control
              value={ProductInfo.imagePath}
              sm="2"
              type="file"
              placeholder="ألاسم"
              style={{ minWidth: '250px' }}
            />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formSelectPurchaseCategories"
          onChange={handleChangeSelectPurchaseCategories}
        >
          <Form.Label column sm="2" style={{ minWidth: '150px' }}>
            الصنف الرئيسية
          </Form.Label>
          <Col sm="3">
            <Form.Select
              aria-label="select Purchase Type"
              value={ProductInfo.categoryID}
              onChange={(e) => ChangeCategoryIdValue(e.target.value)}
              style={{ minWidth: '250px' }}
            >
              <option value={-1}>اختر....</option>
              {ProductCategories.map((category) => (
                <option value={category.CategoryID} key={category.CategoryID}>
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
            اسم المنتج (العربي) :
          </Form.Label>
          <Col sm="3">
            <Form.Control
              value={ProductInfo.itemName_AR}
              onChange={(e) => ChangeitemName_ARValue(e.target.value)}
              sm="2"
              type="text"
              placeholder="ألاسم"
              style={{ minWidth: '250px' }}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          style={{ marginTop: '50px', marginBottom: '25px' }}
          controlId="formLocation"
        >
          <Form.Label column sm="2" style={{ minWidth: '150px' }}>
            اسم المنتجر (ENG) (اختياري) :
          </Form.Label>
          <Col sm="3">
            <Form.Control
              value={ProductInfo.itemName_EN}
              onChange={(e) => ChangeitemName_ENValue(e.target.value)}
              sm="2"
              type="text"
              placeholder="الاسم"
              style={{ minWidth: '250px' }}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formInputTotal">
          <Form.Label column sm="2" style={{ minWidth: '150px' }}>
            المجموع
          </Form.Label>
          <Col sm="3">
            <Form.Control
              type="number"
              value={ProductInfo.price}
              defaultValue={0.0}
              onChange={(e) => ChangepProductPriceValue(e.target.value)}
              style={{ minWidth: '250px' }}
            />
          </Col>
        </Form.Group>
      </Form>
      <StoreFormSave SaveOpreation={SaveOpreation} />
    </>
  )
}

function StoreFormSave({ SaveOpreation }) {
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
