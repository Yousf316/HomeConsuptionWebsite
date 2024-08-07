import Cookies from 'js-cookie'

export async function GetPurchase_CategoriesTable() {
  const token = Cookies.get('LOGIN_Info')

  let data = null
  await fetch(
    `https://www.homecproject.somee.com/api/Purchase_Categories/GetPurchase_CategoriesTable`,
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

export async function GetPurchase_Category(PCategoryID) {
  const token = Cookies.get('LOGIN_Info')

  let data = null
  await fetch(
    `//www.homecproject.somee.com/api/Purchase_Categories/GetPurchase_Category/${PCategoryID}`,
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

export async function AddNewPurchase_Category(PCategoryInfo) {
  const token = Cookies.get('LOGIN_Info')
  let data = null
  await fetch(`//www.homecproject.somee.com/api/Purchase_Categories/AddNewPurchase_Category`, {
    method: 'POST',
    body: JSON.stringify(PCategoryInfo),
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

export async function SetUpdatePurchase_Categories(PCategoryInfo, PCategoryID) {
  const token = Cookies.get('LOGIN_Info')

  let data = null
  await fetch(`//www.homecproject.somee.com/api/Purchase_Categories/${PCategoryID}`, {
    method: 'PUT',
    body: JSON.stringify(PCategoryInfo),
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

export async function DeletePurchase_Categories(PCategoryID) {
  const token = Cookies.get('LOGIN_Info')

  let data = null
  await fetch(
    `//www.homecproject.somee.com/api/Purchase_Categories/DeletePurchase_Categories/${PCategoryID}`,
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
