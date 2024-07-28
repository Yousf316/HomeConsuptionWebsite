import Cookies from 'js-cookie'

export async function GetPurchasesInfo(PurchaseID) {
  const token = Cookies.get('LOGIN_Info')

  let data = null
  await fetch(`https://www.homecproject.somee.com/api/Purchase/${PurchaseID}`, {
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

export async function GetPurchasesTable(PageNumber) {
  const token = Cookies.get('LOGIN_Info')

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

export async function SetNewPurchases(PurchaseInfo) {
  const token = Cookies.get('LOGIN_Info')
  let data = null
  await fetch(`//www.homecproject.somee.com/api/Purchase/NewPurchase`, {
    method: 'POST',
    body: JSON.stringify(PurchaseInfo),
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

export async function SetNewSubPurchases(PurchaseInfo, PurchaseID) {
  const token = Cookies.get('LOGIN_Info')

  let data = null
  await fetch(`//www.homecproject.somee.com/api/PurchaseSub/NewPurchaseSub/${PurchaseID}`, {
    method: 'POST',
    body: JSON.stringify(PurchaseInfo),
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
      console.log(data)
    })
    .catch((error) => console.error('Fetch error:', error))

  return data
}

export async function SetUpdatePurchases(PurchaseInfo, PurchaseID) {
  const token = Cookies.get('LOGIN_Info')

  let data = null
  await fetch(`//www.homecproject.somee.com/api/Purchase/${PurchaseID}`, {
    method: 'PUT',
    body: JSON.stringify(PurchaseInfo),
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

export async function SetUpdateSubPurchases(PurchaseInfo, PurchaseID) {
  const token = Cookies.get('LOGIN_Info')

  let data = null
  await fetch(`//www.homecproject.somee.com/api/PurchaseSub/UpdatePurchaseSub/${PurchaseID}`, {
    method: 'PUT',
    body: JSON.stringify(PurchaseInfo),
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

export async function DeletePurchases(PurchaseID) {
  const token = Cookies.get('LOGIN_Info')

  let data = null
  await fetch(`//www.homecproject.somee.com/api/Purchase/${PurchaseID}`, {
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
