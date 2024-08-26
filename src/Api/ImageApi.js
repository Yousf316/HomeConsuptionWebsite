import Cookies from 'js-cookie'

export async function GetImage(ImagePath) {
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

export async function SetNewImage(ImagePath) {
  const token = Cookies.get('LOGIN_Info')
  let data = null
  await fetch(`//www.homecproject.somee.com/api/Items/NewItem`, {
    method: 'POST',
    body: JSON.stringify(ProductInfo),
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

export async function DeleteImage(PurchaseID) {
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
