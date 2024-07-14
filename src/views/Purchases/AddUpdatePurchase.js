/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useMemo, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie'

import {
  MRT_EditActionButtons,
  MaterialReactTable,
  // createRow,
  useMaterialReactTable,
} from 'material-react-table'
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { colorthem } from '../../Global/coloreThem'
import PurchaseForm, { PurchaseFormTotal } from './PurchaseForm'

const AddUpdatePurchase = () => {
  const [validationErrors, setValidationErrors] = useState({})

  const columns = useMemo(
    () => [
      {
        accessorKey: 'Total',
        header: 'المجموع',

        enableEditing: false,
      },
      {
        accessorKey: 'PricePerItem',
        header: 'السعر',

        required: true,
      },
      {
        accessorKey: 'Quantity',
        header: 'الكمية',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.firstName,
          helperText: validationErrors?.firstName,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              Quantity: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: 'description',
        header: 'الوصف',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.description,
          helperText: validationErrors?.description,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              description: undefined,
            }),
        },
      },
      {
        accessorKey: 'itemName',
        header: 'اسم المنتج',
        muiEditTextFieldProps: {
          //type: 'email',
          required: true,
          error: !!validationErrors?.itemName,
          helperText: validationErrors?.itemName,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              itemName: undefined,
            }),
        },
      },
      {
        accessorKey: 'id',
        header: 'رقم المنتج',
        // enableEditing: false,
        //visibleInShowHideMenu :false,
        //editVariant: 'select',
        // editSelectOptions: null,
        muiEditTextFieldProps: {
          // select: true,
          error: !!validationErrors?.id,
          helperText: validationErrors?.id,
        },
      },
      {
        accessorKey: 'sort',
        header: '#',
        enableEditing: false,
        //visibleInShowHideMenu :false,
        //editVariant: 'select',
        // editSelectOptions: null,
        muiEditTextFieldProps: {
          // select: true,
          error: !!validationErrors?.sort,
          helperText: validationErrors?.sort,
        },
      },
    ],
    [validationErrors],
  )

  const [Rowitems, setRowitems] = useState([])
  const { id } = useParams()

  useEffect(() => {
    if (id != 0) {
      async function GetPurchaseInfo() {
        const dataTable = await GetPurchasesInfo(id)
        console.log(dataTable)
        document.getElementById('formPlaintextPurchaseID').value = dataTable.purchaseID
        document.getElementById('formSelectPurchaseType').value = dataTable.type
        document.getElementById('formInputTotalAfterDiscount').value = dataTable.totalBeforTax

        const SelectSores = document.getElementById('formSelectSores')

        SelectSores.value = dataTable.storeID
        document.getElementById('formInputTotal').value = dataTable.totalBeforTax
        const inputElement = document.getElementById('formInputTax')
        inputElement.value = dataTable.taxAmount // Set the value programmatically
        console.log(inputElement)
        // Create a new input event (simulating user input)
        const inputEvent = new InputEvent('input', {
          bubbles: true, // Allow event to bubble up the DOM
          cancelable: true, // Allow event to be canceled
        })

        console.log(inputEvent)

        // Dispatch the input event
        inputElement.dispatchEvent(inputEvent)

        // Now the onchange event should fire

        if (dataTable.type == 2) {
          const PurchaseSub = await GetPurchaseSubInfo(id)
          console.log(PurchaseSub)

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
        }
      }
      GetPurchaseInfo()
    }
  }, [id])
  const handleCreateUser = async ({ values, table }) => {
    const newValidationErrors = validateUser(values)
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors)
      return
    }
    setValidationErrors({})
    await Createitem(values)
    table.setCreatingRow(null) //exit creating mode
  }

  const handleSaveUser = async ({ values, table }) => {
    const newValidationErrors = validateUser(values)

    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors)
      return
    }
    setValidationErrors({})
    await Updateitem(values)
    table.setEditingRow(null) //exit editing mode
  }

  const openDeleteConfirmModal = (row) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setRowitems((prevUsers) => prevUsers.filter((p) => p.sort != row.original.sort))

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
  function Createitem(newUserInfo) {
    newUserInfo.sort = Rowitems.length + 1
    newUserInfo.Total = Number(newUserInfo.PricePerItem) * Number(newUserInfo.Quantity)
    //newUserInfo.Total =15
    setRowitems((prevUsers) => [
      ...prevUsers,
      {
        ...newUserInfo,
      },
    ])
  }

  function Updateitem(UpdateUserInfo) {
    setRowitems((prevUsers) => {
      return prevUsers.map((user) => {
        if (user.sort === UpdateUserInfo.sort) {
          // Update the specific user info here
          return { ...user, ...UpdateUserInfo }
        }
        return user // Keep other users unchanged
      })
    })
  }

  const color = useContext(colorthem)
  const baseBackgroundColor = color.color === 'dark' ? 'rgb(13, 0, 0)' : 'rgb(255, 255, 255)'

  const table = useMaterialReactTable({
    columns,
    data: Rowitems,
    createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
    editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,

    onCreatingRowSave: handleCreateUser,
    onEditingRowSave: handleSaveUser,

    onCreatingRowCancel: () => setValidationErrors({}),
    onEditingRowCancel: () => setValidationErrors({}),
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">أدراج بند</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    //optionally customize modal content
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Edit User</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="تعديل">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="حذف">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true)
        }}
      >
        أدراج بند
      </Button>
    ),
    muiTableHeadCellProps: {
      //no useTheme hook needed, just use the `sx` prop with the theme callback
      sx: (theme) => ({
        color: theme.palette.text.secondary,
      }),
    },
  })

  return (
    <>
      <PurchaseForm />
      <MaterialReactTable table={table} />
      <PurchaseFormTotal />
    </>
  )
}

export default AddUpdatePurchase

const validateRequired = (value) => !!value.length

function validateUser(user) {
  return {
    Quantity: !validateRequired(user.Quantity) ? 'Quantity is Required' : '',
    //id: !validateRequired(user.id) ? 'Last Name is Required' : '',
    itemName: !validateRequired(user.Quantity) ? 'itemName is Required' : '',
  }
}

export async function GetPurchasesInfo(PurchaseID) {
  const token = Cookies.get('LOGIN_Info')

  let data = null
  await fetch(`//www.homecproject.somee.com/api/Purchase/${PurchaseID}`, {
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

export async function GetPurchaseSubInfo(PurchaseID) {
  const token = Cookies.get('LOGIN_Info')

  let data = null
  await fetch(`//www.homecproject.somee.com/api/PurchaseSub/${PurchaseID}`, {
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
