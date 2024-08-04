import Cookies from 'js-cookie'

export async function GetStores() {
  const token = Cookies.get('LOGIN_Info')

  let data = null
  await fetch(`//www.homecproject.somee.com/api/Stores/GetStores`, {
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

export async function GetStoreByID(StoreID) {
  const token = Cookies.get('LOGIN_Info')

  let data = null
  await fetch(`//www.homecproject.somee.com/api/Stores/GetStoreByID/${StoreID}`, {
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
export async function GetStoreByName(StoreName) {
  const token = Cookies.get('LOGIN_Info')

  let data = null
  await fetch(`//www.homecproject.somee.com/api/Stores/GetStoreByName/${StoreName}`, {
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
export async function SetNewStores(StoreInfo) {
  const token = Cookies.get('LOGIN_Info')
  let data = null
  await fetch(`//www.homecproject.somee.com/api/Stores/NewStore`, {
    method: 'POST',
    body: JSON.stringify(StoreInfo),
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

export async function SetUpdateStore(StoreInfo, StoreID) {
  const token = Cookies.get('LOGIN_Info')

  let data = null
  await fetch(`//www.homecproject.somee.com/api/Stores/UpdateStoreInfo/${StoreID}`, {
    method: 'PUT',
    body: JSON.stringify(StoreInfo),
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

export async function DeleteStore(StoreID) {
  const token = Cookies.get('LOGIN_Info')

  let data = null
  await fetch(`//www.homecproject.somee.com/api/Stores/DeleteStoreByID/${StoreID}`, {
    method: 'DELETE',
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
