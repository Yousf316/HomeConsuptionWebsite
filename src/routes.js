import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const PurchaseList = React.lazy(() => import('./views/Purchases/PurchaseList'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/PurchsaseList', name: 'PurchaseList', element: PurchaseList },
]

export default routes
