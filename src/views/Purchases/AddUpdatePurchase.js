/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AgGridReact } from 'ag-grid-react' // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css' // Mandatory CSS required by the Data Grid
import 'ag-grid-community/styles/ag-theme-quartz.min.css' // Optional Theme applied to the Data Grid

import { Button } from '@mui/material'

import { colorthem } from '../../Global/coloreThem'
import PurchaseForm, { PurchaseFormTotal, PurchaseFormSave } from './PurchaseForm'
import FormDialog from './Dialogs'
import { GetPurchasesInfo, GetPurchaseSubInfo } from './PurchaseApi'
import { TaxPrecent } from '../../Global/Globla'
import { format } from 'date-fns'
import dayjs from 'dayjs'

const AddUpdatePurchase = () => {
  const columns = [
    {
      field: 'Edit',
      headerName: 'تعديل',
      cellRenderer: (RowInfo) => {
        return (
          <>
            <Button
              style={{ marginRight: '10px' }}
              color="error"
              variant="contained"
              onClick={() => openDeleteConfirmModal(RowInfo.data.sort)}
            >
              حذف
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setUpdateItemRowInfo(RowInfo.data)
                handleClickOpen(2)
              }}
            >
              تعديل
            </Button>
          </>
        )
      },
    },
    {
      field: 'Total',
      headerName: 'المجموع شامل الضريبة',
    },
    {
      field: 'PricePerItem',
      headerName: 'السعر',
    },
    {
      field: 'Quantity',
      headerName: 'الكمية',
    },
    {
      field: 'description',
      headerName: 'الوصف',
    },
    {
      field: 'itemName',
      headerName: 'اسم المنتج',
    },
    {
      field: 'id',
      headerName: 'رقم المنتج',
    },
    {
      field: 'sort',
      headerName: '#',
    },
  ]

  const [Rowitems, setRowitems] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const { id } = useParams()
  const [open, setOpen] = useState(false)
  const [purchasetype, setpurchasetype] = useState(1)
  const [UpdateItemRownInfo, setUpdateItemRowInfo] = useState(null)
  const [Typeitemsrow, setTypeitemsrow] = useState(1) // 1 create, 2 edite
  const color = useContext(colorthem)
  const baseBackgroundColor = color.color === 'dark' ? 'ag-theme-quartz-dark' : 'ag-theme-quartz'
  const [valueDate, setvalueDate] = useState(dayjs(Date()))

  const handleClickOpen = (number) => {
    setOpen(true)
    setTypeitemsrow(number)
  }

  const handleClose = () => {
    setOpen(false)
  }

  async function SetPurchaseInfo(dataTable) {
    document.getElementById('formPlaintextPurchaseID').value = dataTable.purchaseID
    document.getElementById('formSelectPurchaseType').value = dataTable.type
    document.getElementById('formInputTotalAfterDiscount').value = dataTable.totalBeforTax
    document.getElementById('formInputTotalAfterTax').value = dataTable.totalAfterTax
    document.getElementById('formInputDiscount').value = dataTable.discount ? dataTable.discount : 0

    const SelectSores = document.getElementById('formSelectSores')

    SelectSores.value = dataTable.storeID
    //

    const formattedDate = format(dataTable.issueDate, 'yyyy-MM-dd')
    setvalueDate(dayjs(formattedDate))

    //
    const inputElement = document.getElementById('formInputTotal')

    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value',
    ).set
    nativeInputValueSetter.call(inputElement, dataTable.totalBeforTax)

    const event = new Event('input', { bubbles: true })
    inputElement.dispatchEvent(event)
    //
    if (dataTable.type == 2) {
      const PurchaseSub = await GetPurchaseSubInfo(id)

      const updatedRows = PurchaseSub.map((element, key) => ({
        key: key,
        id: String(element.itemID),
        itemName: element.itemName, // Use actual data if available
        description: element.description, // Use actual data if available
        Quantity: element.quantity, // Use actual data if available
        PricePerItem: element.itemPrice,
        sort: element.p_subID,
        Total: element.totalAmount, // Use actual data if available
      }))

      setRowitems(updatedRows)
      setpurchasetype(dataTable.type)
    }
  }
  function ResetPageValues() {
    document.getElementById('formPlaintextPurchaseID').value = 'لا يوجد'
    document.getElementById('formSelectPurchaseType').value = 1
    document.getElementById('formInputTotalAfterDiscount').value = 0
    document.getElementById('formInputTotalAfterTax').value = 0
    document.getElementById('formInputDiscount').value = 0
    document.getElementById('formInputTotal').value = 0
    document.getElementById('formInputTax').value = 0
    setvalueDate(dayjs(Date()))
    setRowitems([])
  }

  function CalculateItemsTotal() {
    let TotalAmount = 0
    Rowitems.forEach((Row) => {
      TotalAmount += Row.Total
    })

    const inputElement = document.getElementById('formInputTotal')

    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value',
    ).set
    nativeInputValueSetter.call(inputElement, (TotalAmount / TaxPrecent).toFixed(2))

    const event = new Event('input', { bubbles: true })
    inputElement.dispatchEvent(event)
  }

  useEffect(() => {
    if (id != 0) {
      async function GetPurchaseInfo() {
        const dataTable = await GetPurchasesInfo(id)
        SetPurchaseInfo(dataTable)
      }
      const SelectSores = document.getElementById('formSelectSores')

      if (SelectSores.length != 0) {
        GetPurchaseInfo()
      } else {
        setisLoading((preLoading) => !preLoading)
      }
    } else {
      ResetPageValues()
    }
  }, [id, isLoading])

  useEffect(() => {
    CalculateItemsTotal()
  }, [Rowitems])

  function openDeleteConfirmModal(rownumber) {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setRowitems((prevUsers) => prevUsers.filter((p) => p.sort != rownumber))

      setRowitems((prevUsers) => {
        let idnumber = 1 // Initialize the ID counter
        return prevUsers.map((user) => {
          const updatedUser = { ...user, sort: idnumber }
          idnumber++ // Increment the ID counter
          return updatedUser
        })
      })
    }
  }
  function HandleCreateitem(newItemInfo) {
    const sort = Rowitems.length + 1
    newItemInfo.Total = parseFloat((newItemInfo.PricePerItem * newItemInfo.Quantity).toFixed(2))
    setRowitems((previtems) => [
      ...previtems,
      {
        ...newItemInfo,
        sort: sort,
      },
    ])
  }

  function handleUpdateitem(UpdateUserInfo, sort) {
    UpdateUserInfo.Total = parseFloat(
      (UpdateUserInfo.PricePerItem * UpdateUserInfo.Quantity).toFixed(2),
    )

    setRowitems((prevUsers) => {
      return prevUsers.map((user) => {
        if (user.sort === sort) {
          // Update the specific user info here
          return { ...user, ...UpdateUserInfo }
        }
        return user // Keep other users unchanged
      })
    })
  }

  function handlePurchaseType(typeid) {
    setpurchasetype(typeid)

    if (typeid == 2) {
      CalculateItemsTotal()
    }
  }

  return (
    <>
      <PurchaseForm
        handlePurchaseType={handlePurchaseType}
        themeColore={color.color}
        valueDate={valueDate}
        setvalueDate={setvalueDate}
      />
      <div>
        <Button
          variant="contained"
          onClick={() => handleClickOpen(1)}
          style={{ minWidth: '150px', margin: '10px 0' }}
          disabled={purchasetype == 1 ? true : false}
        >
          ادرج بند
        </Button>
      </div>
      <div
        className={baseBackgroundColor} // applying the Data Grid theme
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact rowData={Rowitems} columnDefs={columns} />
      </div>
      <PurchaseFormTotal purchaseType={purchasetype} />
      <PurchaseFormSave />

      {open && (
        <FormDialog
          open={open}
          handleClose={handleClose}
          HandleCreateitem={HandleCreateitem}
          type={Typeitemsrow}
          handleUpdateitem={handleUpdateitem}
          UpdateItemRownInfo={UpdateItemRownInfo}
        />
      )}
    </>
  )
}

export default AddUpdatePurchase
