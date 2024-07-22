import React, { useContext, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import '../../../Global/user'
import { UserContext, GetUserToken } from '../../../Global/user'
import Cookies from 'js-cookie'

function ClearLogined() {
  // eslint-disable-next-line prettier/prettier
  Cookies.remove('LOGIN_Info',{ path: '/' })
}
const Login = () => {
  const userinfo = useContext(UserContext)

  async function logined() {
    await createCookie()

    window.location.hash = '/home'
  }

  async function createCookie() {
    let username = document.getElementById('username').value
    let pwd = document.getElementById('password').value

    let tokenKey = await GetUserToken(username, pwd)

    if (tokenKey === '') {
      ClearLogined()
      return
    }

    Cookies.set('LOGIN_Info', tokenKey, {})

    userinfo.setUserInfo((userInfo) => ({
      ...userInfo,
      username: username,
    }))
  }

  useEffect(() => {
    console.log(userinfo)
  }, [])

  ClearLogined()
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm action="#/home" method="GET">
                    <h1>تسجيل الدخول</h1>
                    <p className="text-body-secondary">سجل دخولك باستخدام حسابك</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" id="username" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        id="password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" onClick={logined} className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          نسيت كلمة المرور
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" >
                <CCardBody className="text-center">
                  <div>
                    <h2>حساب جديد؟</h2>
                    <p>
                       موقع المحاسب المنزلي ,  لحساب الفوانير المنزلية. سجل وقم بتجربة حساب فواتيرك
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        سجل الان
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
