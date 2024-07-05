import React, { useContext, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { UserContext, GetUserInfo } from '../Global/user'
import Cookies from 'js-cookie'

const DefaultLayout = () => {
  const userinfo = useContext(UserContext)
  const [isValidUser, setValidUser] = useState(null)

  useEffect(() => {
    async function isValidUser() {
      const token = Cookies.get('LOGIN_Info')

      const UserdataInfo = await GetUserInfo(token)
      if (UserdataInfo == null) {
        setValidUser(false)
        return false
      }
      console.log(UserdataInfo.userName)

      userinfo.setUserInfo((prevUserInfo) => {
        return { username: 'lol', UserID: '' }
      })
      console.log(userinfo)

      console.log(userinfo.userInfo)
      return true
    }

    isValidUser()
  }, [])

  if (isValidUser === false) return <Navigate to="/" replace />

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
