import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Cookies from 'js-cookie'
import Styles from './PurchaseFormStyles.module.css'
import { Box, Button } from '@mui/material'
import { TaxPrecent } from '../../Global/Globla'

function PurchaseForm() {
  function handleChangeSelect(e) {
    console.log(e.target.value)
    //document.getElementById("formPlaintextPurchaseID").value =1
    console.log(document.getElementById('formSelectSores').value)
  }

  const [Stores, setStores] = useState([])

  useEffect(() => {
    async function fetchData() {
      const dataTable = await GetٍStores()
      //console.log(dataTable)
      setStores(dataTable)
    }
    fetchData()
  }, [])

  return (
    <Form>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPurchaseID">
        <Form.Label column sm="2">
          رقم الفاتورة
        </Form.Label>
        <Col sm="10">
          <Form.Control plaintext readOnly defaultValue="لا يوجد" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formSelectPurchaseType">
        <Form.Label column sm="2">
          نوع الفاتورة
        </Form.Label>
        <Col sm="10">
          <Form.Select aria-label="select Purchase Type" onChange={(e) => handleChangeSelect(e)}>
            <option value="1">سريعة</option>
            <option value="2">عادية</option>
          </Form.Select>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formSelectSores">
        <Form.Label column sm="2">
          المتجر
        </Form.Label>
        <Col sm="10">
          <Form.Select aria-label="select Purchase Type" onChange={(e) => handleChangeSelect(e)}>
            {Stores.map((store) => (
              <option value={store.StoreID} key={store.StoreID}>
                {store.StoreName}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Form.Group>
    </Form>
  )
}

export function PurchaseFormTotal() {
  function handleDiscount(discountinfo) {
    const TotalafterDiscount = document.getElementById('formInputTotalAfterDiscount')
    const TotalBeforeDiscount = document.getElementById('formInputTotal')
    const TotalAfterTax = document.getElementById('formInputTotalAfterTax')
    const Tax = document.getElementById('formInputTax')
    TotalafterDiscount.value = (TotalBeforeDiscount.value - discountinfo.target.value).toFixed(2)
    TotalAfterTax.value = (TotalafterDiscount.value * TaxPrecent).toFixed(2)
    Tax.value =  (TotalAfterTax.value - TotalafterDiscount.value).toFixed(2)
  }
  return (
    <Form className={Styles['Total-form-main']}>
      <Form.Group as={Row} className={Styles['Total-form']} controlId="formInputTotal">
        <Form.Label column sm="1">
          المجموع
        </Form.Label>
        <Col sm="5">
          <Form.Control type="number" readOnly={true} defaultValue={0.0} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className={Styles['Total-form']} controlId="formInputDiscount">
        <Form.Label column sm="1">
          الخصم
        </Form.Label>
        <Col sm="5">
          <Form.Control type="number" defaultValue={0.0} onChange={(e) => handleDiscount(e)} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className={Styles['Total-form']} controlId="formInputTotalAfterDiscount">
        <Form.Label column sm="1">
          الاجمالي بعد الخصم
        </Form.Label>
        <Col sm="5">
          <Form.Control type="number" defaultValue={0.0} readOnly={true} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className={Styles['Total-form']} controlId="formInputTax">
        <Form.Label column sm="1">
          الضريبة
        </Form.Label>
        <Col sm="5">
          <Form.Control type="number" readOnly={true} defaultValue={0.0} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className={Styles['Total-form']} controlId="formInputTotalAfterTax">
        <Form.Label column sm="1">
          الصافي
        </Form.Label>
        <Col sm="5">
          <Form.Control type="number" readOnly={true} defaultValue={0.0} />
        </Col>
      </Form.Group>
    </Form>
  )
}

export function PurchaseFormSave() {
  function handleDiscount(discountinfo) {
    console.log(discountinfo.target.value)
    const TotalafterDiscount = document.getElementById('formInputTotalAfterDiscount')
    const TotalBeforeDiscount = document.getElementById('formInputTotal')
    console.log(TotalafterDiscount.value)
    TotalafterDiscount.value = TotalBeforeDiscount.value - discountinfo.target.value
  }
  return (
    <Form className={Styles['Save-form-main']}>
      <div className={Styles['div-save-buttons']}>
        <Button variant="outlined" style={{ minWidth: '150px', margin: '25px' }}>
          الغاء
        </Button>
        <Button variant="contained" style={{ minWidth: '150px', margin: '25px' }}>
          حفظ
        </Button>
      </div>
    </Form>
  )
}

export default PurchaseForm

export async function GetٍStores() {
  const token = Cookies.get('LOGIN_Info')

  let data = null
  await fetch(`//www.homecproject.somee.com/api/Stores/GetStores`, {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-type': 'application/json',
    },
  })
    .then((result) => {
      let Promiseresult = result.json()
      return Promiseresult
    })
    .then((finalResult) => {
      data = finalResult
    })
    .catch((error) => console.error('Fetch error:', error))

  return data
}
