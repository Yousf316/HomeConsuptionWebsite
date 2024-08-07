import Cookies from 'js-cookie'

export async function GetPurchaseSubCategoriesTableByPCategoryID(PCategoryID) {
  const token = Cookies.get('LOGIN_Info')

  let data = null
  await fetch(
    `//www.homecproject.somee.com/api/PurchaseSubBaseCategories/GetPurchaseSubBaseCategoriesTable/${PCategoryID}`,
    {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json',
      },
    },
  )
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

export async function AddNewPurchaseSubBaseCategories(PSBCategoryInfo) {
  const token = Cookies.get('LOGIN_Info')
  let data = null
  await fetch(
    `//www.homecproject.somee.com/api/PurchaseSubBaseCategories/AddNewPurchaseSubBaseCategories`,
    {
      method: 'POST',
      body: JSON.stringify(PSBCategoryInfo),
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json',
      },
    },
  )
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

export async function DeletePurchaseSubBaseCategories(PSCategoryID, PCategoryID) {
  const token = Cookies.get('LOGIN_Info')

  let data = null
  await fetch(
    `//www.homecproject.somee.com/api/PurchaseSubBaseCategories/DeletePurchaseSubBaseCategories/PSCategoryID=${PSCategoryID}&PCategoryID=${PCategoryID}`,
    {
      method: 'DELETE',

      headers: {
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json',
      },
    },
  )
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
