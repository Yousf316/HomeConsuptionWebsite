import * as React from 'react'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { AgGridReact } from 'ag-grid-react' // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css' // Mandatory CSS required by the Data Grid
import 'ag-grid-community/styles/ag-theme-quartz.min.css' // Optional Theme applied to the Data Grid
import { colorthem } from '../../Global/coloreThem'
import { GetItemsTable } from '../Items/ItemsApi'
import NativeSelect from '@mui/material/NativeSelect'
import { useEffect } from 'react'

export default function FormDialog({
  open,
  handleClose,
  HandleCreateitem,
  type,
  handleUpdateitem,
  UpdateItemRownInfo,
}) {
  const [openStores, setopenStores] = React.useState(false)
  const [ItemInfo, seItemInfo] = React.useState(null)
  const [isLoading, setisLoading] = React.useState(false)

  React.useEffect(() => {
    if (ItemInfo != null) {
      document.getElementById('PricePerItem').value = ItemInfo.Price
      document.getElementById('ItemsID').value = ItemInfo.ItemID
      document.getElementById('ItemName').value = ItemInfo.itemName
      console.log(type)
    }
  }, [ItemInfo])

  useEffect(() => {
    function GetItemInfo() {
      if (type === 2) {
        document.getElementById('PricePerItem').value = UpdateItemRownInfo.PricePerItem
        document.getElementById('ItemsID').value = UpdateItemRownInfo.id
        document.getElementById('ItemName').value = UpdateItemRownInfo.itemName
      }
    }
    console.log('hi')
    if (document.getElementById('PricePerItem') != null  ) {
      GetItemInfo()
    } else {
      if (type === 2)
      setisLoading((preLoading) => !preLoading)
    }
  }, [isLoading])

  const handleAcceptButton = () => {
    if (type === 1) {
      handleCreateItem()
    } else if (type === 2) {
      handleUpdateItem()
    }
    handleClose()
  }

  const handleCreateItem = () => {
    const newItem = {
      PricePerItem: document.getElementById('PricePerItem').value,
      id: document.getElementById('ItemsID').value,
      itemName: document.getElementById('ItemName').value,
      Quantity: document.getElementById('Quantity').value,
    }
    HandleCreateitem(newItem)
  }

  const handleUpdateItem = () => {
    const UpdateItem = {
      PricePerItem: document.getElementById('PricePerItem').value,
      id: document.getElementById('ItemsID').value,
      itemName: document.getElementById('ItemName').value,
      Quantity: document.getElementById('Quantity').value,
    }
    handleUpdateitem(UpdateItem, UpdateItemRownInfo.sort)
  }

  const handleClickOpenStores = () => {
    setopenStores(true)
  }

  const handleCloseStores = () => {
    setopenStores(false)
  }
  return (
    <React.Fragment>
      <FormDialogStores
        seItemInfo={seItemInfo}
        openStores={openStores}
        handleCloseStores={handleCloseStores}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
        }}
      >
        <DialogTitle>أدراج بند</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            id="PricePerItem"
            name="PricePerItem"
            label="السعر"
            type="number"
            fullWidth
            variant="standard"
            spellCheck
            defaultValue={0}
          />
          <FormControlLabel control={<Checkbox defaultChecked />} label="شامل الضريبة" />
          <TextField
            required
            margin="dense"
            id="Quantity"
            name="Quantity"
            label="الكمية"
            type="number"
            fullWidth
            variant="standard"
            spellCheck
            defaultValue={1}
          />
          <TextField
            margin="dense"
            id="Description"
            name="Description"
            label="الوصف"
            multiline
            fullWidth
            variant="standard"
            spellCheck
          />
          <TextField
            InputProps={{
              readOnly: true,
            }}
            margin="dense"
            id="ItemName"
            name="ItemName"
            label="اسم المنتج"
            type="text"
            fullWidth
            variant="standard"
            spellCheck
            defaultValue={' '}
          />
          <Button variant="contained" onClick={() => handleClickOpenStores()}>
            اختر المنتج
          </Button>
          <TextField
            InputProps={{
              readOnly: true,
            }}
            margin="dense"
            id="ItemsID"
            name="ItemsID"
            label="رقم المنج"
            type="number"
            fullWidth
            variant="standard"
            spellCheck
            defaultValue={0}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>الغاء</Button>
          <Button type="button" onClick={() => handleAcceptButton()}>
            موافق
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export function FormDialogStores({ openStores, handleCloseStores, seItemInfo }) {
  const columns = [
    {
      field: 'select',
      headerName: 'لختيار',
      cellRenderer: (RowInfo) => {
        return (
          <>
            <Button variant="contained" onClick={() => handleSelectItem(RowInfo.data)}>
              اختيار
            </Button>
          </>
        )
      },
    },

    {
      field: 'Price',
      headerName: 'السعر',
    },

    {
      field: 'itemName',
      headerName: 'اسم المنتج',
    },
    {
      field: 'ItemID',
      headerName: 'رقم المنتج',
    },
  ]
  const color = React.useContext(colorthem)
  const baseBackgroundColor = color.color === 'dark' ? 'ag-theme-quartz-dark' : 'ag-theme-quartz'
  const [Rowitems, setRowitems] = React.useState([])
  const [renderedItems, setRenderedItems] = React.useState([])
  const [CurrentPage, setCurrentPage] = React.useState(1)

  function handleSelectItem(ItemInfo) {
    seItemInfo(ItemInfo)
    handleCloseStores()
  }

  function handleChangePage(PageNumber) {
    setCurrentPage(PageNumber)
  }
  async function GetItemListInfo() {
    const dataTable = await GetItemsTable(CurrentPage)
    const dtList = JSON.parse(dataTable.json)

    const updatedRows = dtList.map((element, key) => ({
      key: key,
      ItemID: String(element.ItemID),
      itemName: element.ItemName_AR,
      description: element.description,
      Price: element.Price,
    }))

    setRowitems(updatedRows)
    const items = []
    for (let i = 1; i <= dataTable.pageCount; i++) {
      items.push(
        <option value={i} key={i}>
          {i}
        </option>,
      )
    }
    setRenderedItems(items)
  }

  React.useEffect(() => {
    if (openStores === true) GetItemListInfo()
  }, [openStores, CurrentPage])

  return (
    <Dialog
      open={openStores}
      onClose={handleCloseStores}
      PaperProps={{
        component: 'form',
        // onSubmit: ,
      }}
      fullWidth
    >
      <DialogTitle>المنتج</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="ItemName"
          name="ItemName"
          label="اسم المنتج"
          type="text"
          fullWidth
          variant="filled"
          spellCheck
        />
        <div
          className={baseBackgroundColor} // applying the Data Grid theme
          style={{ height: 400 }} // the Data Grid will fill the size of the parent container
        >
          <AgGridReact rowData={Rowitems} columnDefs={columns} />
        </div>
        <NativeSelect
          defaultValue={1}
          onChange={(e) => handleChangePage(e.target.value)}
          inputProps={{
            name: 'الصفحة',
            id: 'uncontrolled-native',
          }}
        >
          {renderedItems}
        </NativeSelect>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseStores}>الغاء</Button>
      </DialogActions>
    </Dialog>
  )
}
