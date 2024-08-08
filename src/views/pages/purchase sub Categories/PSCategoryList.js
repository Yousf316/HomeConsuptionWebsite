import React, { useEffect, useState, useMemo, useContext } from 'react'
import { MaterialReactTable, MRT_ActionMenuItem, useMaterialReactTable } from 'material-react-table'
import { Edit, Delete } from '@mui/icons-material'
import { createTheme, ThemeProvider } from '@mui/material'
import { colorthem } from '../../../Global/coloreThem'

import TransitionAlerts from '../../../components/Alert'
import { DeletePurchase_SubCategory, GetPurchase_SubCategoryTable } from '../../../Api/Purchase_SubCategoriesApi'



function List() {
  const columns = useMemo(
    () => [

      {
        accessorKey: 'SubCategoryName',
        header: 'اسم الصنف',
      },
      {
        accessorKey: 'PSCategoryID',
        header: 'الرقم التعريفي',
      },
    ],
    [],
  )
  const [Rowitems, setRowitems] = useState([])
  const [Refresh, setRefresh] = useState(false)

  const [openAlert, setopenAlert] = React.useState(false)
  const [severityType, setseverityType] = React.useState('')
  const [MessageAlert, setMessageAlert] = React.useState('')
  useEffect(() => {
    const GetList = async () => {
      const List = await GetPurchase_SubCategoryTable()
      console.log(List)
      const updatedRows = List.map((element, key) => ({
        key: key,
        PSCategoryID: String(element.PSCategoryID),
        SubCategoryName: element.SubCategoryName,
      }))

      setRowitems(updatedRows)
    }
    GetList()
  }, [Refresh])

  var element = document.querySelector('.MuiBox-root.css-exd1zr')
  element != null ? element.remove() : null

  var element2 = document.querySelector(
    '#root > div > div.wrapper.d-flex.flex-column.min-vh-100 > div.body.flex-grow-1 > div > div > div.MuiTableContainer-root.css-nhjqqh-MuiTableContainer-root > table > thead > tr > th.MuiTableCell-root.MuiTableCell-head.MuiTableCell-alignLeft.MuiTableCell-sizeMedium.css-eb6d7g-MuiTableCell-root > div > div.Mui-TableHeadCell-Content-Labels.MuiBox-root.css-4ng264 > div',
  )
  element2 != null ? element2.remove() : null
  const color = useContext(colorthem)

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          // mode: storedTheme === 'auto' ? 'dark' : storedTheme,
          mode: color.color === '' ? 'dark' : color.color,
        },
      }),
    [color.color],
  )

  // Correct: Uses a memoized function
  const handleClickEdite = (id) => {
    window.location.hash = `/home/PSCategory/${id}`
  }
  const handleClickDelete = async (id) => {
    const DeletedStore = await DeletePurchase_SubCategory(id)

    if (DeletedStore != null && DeletedStore.status == null) {
      setseverityType('success')
      setMessageAlert('تمت العملية بنجاح')
      setRefresh((preValue) => (preValue = !preValue))
    } else {
      setseverityType('error')
      setMessageAlert('فشلت العملية')
    }
    setopenAlert(true)
  }
  // ...

  return (
    <>
      <TransitionAlerts
        open={openAlert}
        setOpen={setopenAlert}
        Message={MessageAlert}
        severityType={severityType}
      />
      <ThemeProvider theme={theme}>
        <MaterialReactTable
          columns={columns}
          data={Rowitems}
          enableRowActions
          paginationDisplayMode={'pages'}
          renderRowActionMenuItems={({ row, table }) => [
            <MRT_ActionMenuItem
              icon={<Edit />}
              key="edit"
              label="تعديل"
              onClick={() => handleClickEdite(row.original.PSCategoryID)}
              table={table}
            />,
            <MRT_ActionMenuItem
              icon={<Delete />}
              key="delete"
              label="حذف"
              onClick={async () => {
                if (
                  window.confirm(`هل انت متاكد من حذف الفاتورة رقم : ${row.original.PSCategoryID} ؟ `)
                ) {
                  await handleClickDelete(row.original.PSCategoryID)
                }
              }}
              table={table}
            />,
          ]}
        />
      </ThemeProvider>
    </>
  )
}

export default List
