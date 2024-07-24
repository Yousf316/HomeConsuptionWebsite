import Cookies from 'js-cookie'

export async function GetPurchaseCategoriesTable() {
  const token = Cookies.get('LOGIN_Info')

  let data = null
  await fetch(`//www.homecproject.somee.com/api/Purchase_Categories/GetPurchase_CategoriesTable`, {
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

export async function GetPurchaseSubCategoriesTable(PCategoryID) {
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
