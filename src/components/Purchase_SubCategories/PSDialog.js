import * as React from 'react'

import Button from '@mui/material/Button'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import DialogTitle from '@mui/material/DialogTitle'
import { AgGridReact } from 'ag-grid-react' // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css' // Mandatory CSS required by the Data Grid
import 'ag-grid-community/styles/ag-theme-quartz.min.css' // Optional Theme applied to the Data Grid
import { colorthem } from '../../Global/coloreThem'
import NativeSelect from '@mui/material/NativeSelect'
import { useEffect, useState } from 'react'
import { GetPurchaseSubCategoriesTableByPCategoryID } from '../../Api/SubBaseCategoriesApi'
import { GetPurchase_CategoriesTable } from '../../Api/Purchase_CategoriesApi'
import { GetPurchase_SubCategoryTable } from '../../Api/Purchase_SubCategoriesApi'

export default function FormPSDialog({ open, handleClose, TypeOpration }) {
  const handleAcceptButton = () => {
    if (type === 1) {
      handleCreateItem()
    } else if (type === 2) {
      handleUpdateItem()
    }
    handleClose()
  }

  function handleChangeSelectPurchaseCategories(e) {
    setCategory(e.target.value)
  }
  const [Categories, setCategories] = useState([])
  const [SCategories, setSCategories] = useState([])
  const [Category, setCategory] = useState(1)
  const [subCategory, setsubCategory] = useState(-1)

  async function GetPCategories() {
    const dataTable = await GetPurchase_CategoriesTable()
    setCategories(dataTable)
  }

  async function GetAllPSCategories() {
    const dataTable = await GetPurchase_SubCategoryTable()
    setSCategories(dataTable)
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
    GetAllPSCategories()
    GetPCategories()

  }, [])

  const handleCreateItem = () => {}

  const handleUpdateItem = () => {}

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault()
            if (IsValid()) handleAcceptButton()
          },
        }}
      >
        <DialogTitle>{TypeOpration == 1 ? 'ربط صنف بمجموعة' : 'الغاء ربط صنف بمجموعة'}</DialogTitle>
        <DialogContent>
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
          <Button type="submit">موافق</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
