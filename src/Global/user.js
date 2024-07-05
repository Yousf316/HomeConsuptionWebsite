import React, { useState, createContext } from 'react'

class User {
  constructor() {
    this.username = ''
    this.UserID = ''
  }
}
export const UserContext = createContext({})

export default function UserProvider({ children }) {
  const [userInfo, setUserInfo] = useState({})
  return <UserContext.Provider value={{ userInfo, setUserInfo }}>{children}</UserContext.Provider>
}

export async function GetUserToken(UserName, Password) {
  let token = ''
  await fetch('//www.homecproject.somee.com/api/Users/GetNewToken', {
    method: 'POST',
    body: JSON.stringify({
      username: UserName,
      password: Password,
    }),
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then((json) => {
      token = json.token
    })
    .catch((error) => console.error('Fetch error:', error))

  return token
}

export async function GetUserInfo(token) {
  let userInfo = null
  await fetch(
    `//www.homecproject.somee.com/api/Users/GetUserloggedInfoByToken?token=${token}`,
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
    .then((UserInfoResult) => {
      userInfo = UserInfoResult
      console.log(userInfo)
    })
    .catch((error) => console.error('Fetch error:', error))

  return userInfo
}
