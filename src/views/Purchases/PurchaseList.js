import { CTable, CButton, useColorModes } from '@coreui/react'
import React, { useEffect, useState, useMemo, useContext } from 'react'
import Cookies from 'js-cookie'
import { MaterialReactTable, MRT_ActionMenuItem, useMaterialReactTable } from 'material-react-table'
import { Edit, Delete } from '@mui/icons-material'
import { createTheme, ThemeProvider } from '@mui/material'
import { useSelector } from 'react-redux'
import { colorthem } from '../../Global/coloreThem'

function PurchaseList() {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: '#',
      },
      {
        accessorKey: 'Purchase_Date',
        header: 'تاريخ الأصدار',
      },
      {
        accessorKey: 'Purchase_Type',
        header: 'النوع',
      },
      {
        accessorKey: 'Purchase_Total',
        header: 'المجموع',
      },
      
    ],
    [],
  )
  const [Rowitems, setRowitems] = useState([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    //pageSize: -1,
     //customize the default page size
  });
  const [pagecount, setpagecount] = useState(-1)

  useEffect(() => {

    const token = Cookies.get('LOGIN_Info')

    async function fetchData() {
      const dataTable = await GetPurchasesTable(token,pagination.pageIndex+1 )

      const updatedRows = dataTable.map((element, key) => ({
        key: key,
        id: String(element.PurchaseID),
        Purchase_Date: new Date(element.IssueDate).toLocaleDateString(), // Use actual data if available
        Purchase_Type: element.TypeName, // Use actual data if available
        Purchase_Total: element.TotalAfterTax, // Use actual data if available
      }))

      setpagecount( (prev) => prev =pagination.pageIndex+2)
      // Update state once with all changes
      setRowitems(updatedRows)
    }
    fetchData()
  }, [pagination.pageIndex])
  //return <CTable responsive="xl" hover columns={columns} items={Rowitems} />

  var element = document.querySelector('.MuiBox-root.css-exd1zr')
  element != null ? element.remove() : null

  var element2 = document.querySelector('#root > div > div.wrapper.d-flex.flex-column.min-vh-100 > div.body.flex-grow-1 > div > div > div.MuiTableContainer-root.css-nhjqqh-MuiTableContainer-root > table > thead > tr > th.MuiTableCell-root.MuiTableCell-head.MuiTableCell-alignLeft.MuiTableCell-sizeMedium.css-eb6d7g-MuiTableCell-root > div > div.Mui-TableHeadCell-Content-Labels.MuiBox-root.css-4ng264 > div')
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


 

  return (
    <ThemeProvider theme={theme}>
      <MaterialReactTable
        columns={columns}
        data={Rowitems}
        enableRowActions
        manualPagination={true}
        pageCount={pagecount}
        onPaginationChange ={ setPagination } //hoist pagination state to your state when it changes internally
        state= { {pagination} }
        paginationDisplayMode={'pages'}
        renderRowActionMenuItems={({ row, table }) => [
          <MRT_ActionMenuItem //or just use a normal MUI MenuItem component
            icon={<Edit />}
            key="edit"
            label="Edit"
            onClick={() => console.info(row.original.id)}
            table={table}
          />,
          <MRT_ActionMenuItem
            icon={<Delete />}
            key="delete"
            label="Delete"
            onClick={() => console.info('Delete')}
            table={table}
          />,
        ]}
      />
    </ThemeProvider>
  )
}

export default PurchaseList

 export async function GetPurchasesTable(token, PageNumber) {
  let data = null
  await fetch(`//www.homecproject.somee.com/api/Purchase/GetPurchasesTable/${PageNumber}`, {
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
