import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilDescription,
  cilCart,
  cilMoney,
  cilAccountLogout,
  cilSpeedometer,
  cilFastfood,
  cilUser,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'لوحة التحكم',
    to: '/home/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'جديد',
    },
  },

  {
    component: CNavGroup,
    name: 'المشتريات',
    to: '/base',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'ادراج فاتورة مشتريات',
        to: '/home/Purchase/0',
      },
      {
        component: CNavItem,
        name: 'قائمة المشتريات',
        to: '/home/PurchsaseList',
      },
      {
        component: CNavGroup,
        name: 'أدراج صنف',
        to: '/home/PurchsaseList',
        items: [
          ,
          {
            component: CNavItem,
            name: 'صنف رئيسي',
            to: '/home/Purchase_Category/0',
          },
          ,
          {
            component: CNavItem,
            name:'صنف فرعي',
            to: '/home/PSCategory/0',
          },
        ],
      },
      ,
      {
        component: CNavGroup,
        name: 'قائمة الاصناف',
        to: '/home/PurchsaseList',
        items: [
          ,
          {
            component: CNavItem,
            name: 'صنف رئيسي',
            to: '/home/PCategoryList',
          },
          ,
          {
            component: CNavItem,
            name:'صنف فرعي',
            to: '/home/PurchsaseList',
          },
        ],
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'المتاجر',
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'أدراج متجر جديد',
        to: '/home/Store/0',
      },
      {
        component: CNavItem,
        name: 'قائمة المتاجر',
        to: '/home/StoreList',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'المنتجات',
    icon: <CIcon icon={cilFastfood} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'أدراج المنتجات جديد',
        to: '/base/breadcrumbs',
      },
      {
        component: CNavItem,
        name: 'قائمة المنتجات',
        to: '/base/breadcrumbs',
      },
      {
        component: CNavItem,
        name: 'أدراج مجموعة جديدة',
        to: '/base/breadcrumbs',
      },
      {
        component: CNavItem,
        name: 'قائمة المجموعات',
        to: '/base/breadcrumbs',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'المستخدمين',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'أدراج مستخدم جديد',
        to: '/base/breadcrumbs',
      },
      {
        component: CNavItem,
        name: 'قائمة المستخدمين',
        to: '/base/breadcrumbs',
      },
      {
        component: CNavItem,
        name: 'قائمة الافراد',
        to: '/base/breadcrumbs',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'التقارير',
    to: '/charts',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'المشتريات',
        to: '/base/breadcrumbs',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'تسجيل خروج',
    to: '/',
    icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />,
  },
]

export default _nav
