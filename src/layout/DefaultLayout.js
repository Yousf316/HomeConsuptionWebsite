import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import '../Global/user'

function isValidUser() {
  console.log(global.user.username)
  const auth = sessionStorage.getItem('auth')
  if (auth != 1) {
    return false
  }
  return true
}

const DefaultLayout = () => {
  if (!isValidUser()) return <Navigate to="/" replace />

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
