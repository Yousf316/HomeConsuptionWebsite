import * as React from 'react'

import Button from '@mui/material/Button'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import DialogTitle from '@mui/material/DialogTitle'
import 'ag-grid-community/styles/ag-grid.css' // Mandatory CSS required by the Data Grid
import 'ag-grid-community/styles/ag-theme-quartz.min.css' // Optional Theme applied to the Data Grid
import { colorthem } from '../../Global/coloreThem'
import { useEffect, useState, useContext } from 'react'
import {
  AddNewPurchaseSubBaseCategories,
  DeletePurchaseSubBaseCategories,
  GetPurchaseSubCategoriesTableByPCategoryID,
} from '../../Api/SubBaseCategoriesApi'
import { GetPurchase_CategoriesTable } from '../../Api/Purchase_CategoriesApi'
import { GetPurchase_SubCategoryTable } from '../../Api/Purchase_SubCategoriesApi'
import TransitionAlerts from '../Alert'
import { UserContext } from '../../Global/user'

export default function FormPSDialog({ open, handleClose, TypeOpration }) {
  function handleChangeSelectPurchaseCategories(e) {
    setCategory(e.target.value)
  }
  const [Categories, setCategories] = useState([])
  const [SCategories, setSCategories] = useState([])
  const [Category, setCategory] = useState(-1)
  const [subCategory, setsubCategory] = useState(-1)
  const [IsRefresh, setIsRefresh] = useState(false)
  const Userinfo = useContext(UserContext)

  const [openAlert, setopenAlert] = React.useState(false)
  const [severityType, setseverityType] = React.useState('')
  const [MessageAlert, setMessageAlert] = React.useState('')

  async function GetPCategories() {
    const dataTable = await GetPurchase_CategoriesTable()
    setCategories(dataTable)
  }

  async function GetAllPSCategories() {
    if (TypeOpration != 2) {
      const dataTable = await GetPurchase_SubCategoryTable()
      setSCategories(dataTable)
    }
  }

  async function GetPSCategories() {
    if (Category != -1 && TypeOpration != 1) {
      const dataTable = await GetPurchaseSubCategoriesTableByPCategoryID(Category)

      dataTable.status ? setSCategories([]) : setSCategories(dataTable)
    }
  }

  useEffect(() => {
    GetPSCategories()
  }, [Category])

  useEffect(() => {
    async function GetOpreations() {
      await GetAllPSCategories()
      await GetPCategories()
      await GetPSCategories()

    }
    GetOpreations()
  }, [IsRefresh])

  const SaveOperation = async () => {
    if (Category == -1 || subCategory == -1) return false
    if (TypeOpration == 1) {
      return InsertSubBaseCategoryRelation()
    } else {
      return DeleteSubBaseCategoryRelation()
    }
  }
  async function DeleteSubBaseCategoryRelation() {
    const DeletePSBCategory = await DeletePurchaseSubBaseCategories(subCategory, Category)

    if (DeletePSBCategory.status == null) return true

    return false
  }
  async function InsertSubBaseCategoryRelation() {
    const addPSBCategory = {
      psCategoryID: subCategory,
      pCategoryID: Category,
      userID: Userinfo.userInfo.UserID,
    }
    const InsertedPSBCategory = await AddNewPurchaseSubBaseCategories(addPSBCategory)
    if (InsertedPSBCategory.status == null) return true

    return false
  }
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault()
          },
        }}
      >
        <DialogTitle>{TypeOpration == 1 ? 'ربط صنف بمجموعة' : 'الغاء ربط صنف بمجموعة'}</DialogTitle>
        <DialogContent>
          <TransitionAlerts
            open={openAlert}
            setOpen={setopenAlert}
            Message={MessageAlert}
            severityType={severityType}
          />
          <Form>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formSelectPurchaseCategories"
              onChange={handleChangeSelectPurchaseCategories}
            >
              <Form.Label column sm="3" style={{ minWidth: '150px' }}>
                الصنف الرئيسية
              </Form.Label>
              <Col sm="10">
                <Form.Select
                  aria-label="select Purchase Type"
                  value={Category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value={-1}>....اختر</option>

                  {Categories.map((category) => (
                    <option value={category.PCategoryID} key={category.PCategoryID}>
                      {category.CategoryName}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formSelectPurchaseSubCategories">
              <Form.Label column sm="3" style={{ minWidth: '150px' }}>
                الصنف الفرعي
              </Form.Label>
              <Col sm="10">
                <Form.Select
                  aria-label="select Purchase Type"
                  value={subCategory}
                  onChange={(e) => setsubCategory(e.target.value)}
                >
                  <option value={-1}>بدون</option>
                  {SCategories?.map((category) => (
                    <option value={category.PSCategoryID} key={category.PSCategoryID}>
                      {category.SubCategoryName}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>
          </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>الغاء</Button>
          <Button
            type="submit"
            onClick={async () => {
              if (await SaveOperation()) {
                setseverityType('success')
                setMessageAlert('تمت العملية بنجاح')
              } else {
                setseverityType('error')
                setMessageAlert('فشلت العملية')
              }
              setopenAlert(true)
              setIsRefresh(true)
            }}
          >
            موافق
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
