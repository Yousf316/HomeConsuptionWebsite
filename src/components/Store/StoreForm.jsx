import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { Box, Button } from '@mui/material'
import Styles from './StoreFormStyles.module.css'

import TransitionAlerts from '../Alert'

export default function StoreForm() {
  function SaveOpreation() {
    return true
  }
  return (
    <>
      <Form  className={Styles['Save-form-main']}>
        <Form.Group as={Row} controlId="formPlaintextStoreID">
          <Form.Label column sm="2"  style={{minWidth : '150px' }}>
           رقم الفاتورة :
          </Form.Label>
          <Col sm="3">
            <Form.Control sm="2" plaintext readOnly defaultValue="لا يوجد" />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          style={{ marginTop: '50px', marginBottom: '25px' }}
          controlId="formPlaintextStoreName"
        >
          <Form.Label column sm="2"  style={{minWidth : '150px' }}>
            اسم المتجر  :
          </Form.Label>
          <Col sm="3">
            <Form.Control sm="2" type="text" placeholder="اسم المتجر"
              style={{minWidth : '250px' }} />
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
        <TransitionAlerts
          open={openAlert}
          setOpen={setopenAlert}
          Message={MessageAlert}
          severityType={severityType}
        />
      </div>
    </Form>
  )
}
