import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { Box, Button } from '@mui/material'
import Styles from './StoreFormStyles.module.css'

import TransitionAlerts from '../Alert'
import { GetStoreByID, GetStoreByName, SetNewStores, SetUpdateStore } from '../../Api/StoreApi'

export default function StoreForm({ id }) {
  const [IsAddNew, setIsAddNew] = useState(true)
  const [storeInfo, setstoreInfo] = useState({ storeID: 'لا يوجد', storeName: '', location: '' })

  function SetStoreInfo(StoreInfo) {
    console.log(StoreInfo)
    setstoreInfo((previnfo) => ({
      ...previnfo,
      storeID: id,
      storeName: StoreInfo.storeName,
      location: StoreInfo.location,
    }))
    setIsAddNew(false)
  }

  function resetPageValue() {
    setstoreInfo((previnfo) => ({
      ...previnfo,
      storeID: 'لا يوجد',
      storeName: '',
    }))
    setIsAddNew(true)
  }
  function ChangeStoreNameValue(Name) {
    console.log(Name)
    setstoreInfo({ ...storeInfo, storeName: Name })
    console.log(storeInfo)
  }
  async function GetStoreINfo() {
    const storeinfo = await GetStoreByID(id)
    storeinfo.status ? resetPageValue() : SetStoreInfo(storeinfo)
  }
  async function InsertNewStore() {
    const newStore = {
      storeName: storeInfo.storeName,
      location: storeInfo.location,
    }
    const storeinfo = await SetNewStores(newStore)
    console.log(storeinfo)
    return true
  }
  async function UpdateStore() {
    const UpdateStoreInfo = {
      storeName: storeInfo.storeName,
      location: storeInfo.location,
    }
    const storeinfo = await SetUpdateStore(UpdateStoreInfo,storeInfo.storeID)
    console.log(storeinfo)
    return true
  }
  useEffect(() => {
    resetPageValue()
    if (id != 0) {
      GetStoreINfo()
    }
  }, [id])
  async function SaveOpreation() {
    if (await IsValidInfo()) {
      if (IsAddNew) {
        if (InsertNewStore) {
          return true
        } else {
          return false
        }
      }
    } else {
      return false
    }
  }

  async function IsValidInfo() {
    const storeNameInfo = await GetStoreByName(storeInfo.storeName)
    if (storeNameInfo != null) {
      return true
    } else {
      return false
    }
  }
  return (
    <>
      <Form className={Styles['Save-form-main']}>
        <Form.Group as={Row} controlId="formPlaintextStoreID">
          <Form.Label column sm="2" style={{ minWidth: '150px' }}>
            رقم الفاتورة :
          </Form.Label>
          <Col sm="3">
            <Form.Control
              sm="2"
              value={storeInfo.storeID}
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
            اسم المتجر :
          </Form.Label>
          <Col sm="3">
            <Form.Control
              value={storeInfo.storeName}
              onChange={(e) => ChangeStoreNameValue(e.target.value)}
              sm="2"
              type="text"
              placeholder="اسم المتجر"
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
