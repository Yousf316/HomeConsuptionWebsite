import Cookies from 'js-cookie'

export async function GetPurchase_SubCategoryTable() {
  const token = Cookies.get('LOGIN_Info')

  let data = null
  await fetch(
    `https://www.homecproject.somee.com/api/Purchase_SubCategory/GetPurchase_SubCategoryTable`,
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

export async function GetPurchase_SubCategory(PSCategoryID) {
  const token = Cookies.get('LOGIN_Info')

  let data = null
  await fetch(
    `//www.homecproject.somee.com/api/Purchase_SubCategory/GetPurchase_SubCategory/${PSCategoryID}`,
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

export async function AddNewPurchase_SubCategory(PSCategoryInfo) {
  const token = Cookies.get('LOGIN_Info')
  let data = null
  await fetch(`//www.homecproject.somee.com/api/Purchase_SubCategory/AddNewPurchase_SubCategory`, {
    method: 'POST',
    body: JSON.stringify(PSCategoryInfo),
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

export async function SetUpdatePurchases(PSCategoryInfo, PSCategoryID) {
  const token = Cookies.get('LOGIN_Info')

  let data = null
  await fetch(
    `//www.homecproject.somee.com/api/Purchase_SubCategory/UpdatePurchase_SubCategory/${PSCategoryID}`,
    {
      method: 'PUT',
      body: JSON.stringify(PSCategoryInfo),
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

export async function DeletePurchase_SubCategory(PSCategoryID) {
  const token = Cookies.get('LOGIN_Info')

  let data = null
  await fetch(
    `//www.homecproject.somee.com/api/Purchase_SubCategory/DeletePurchase_SubCategory/${PSCategoryID}`,
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
