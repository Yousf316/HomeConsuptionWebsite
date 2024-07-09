import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const PurchaseList = React.lazy(() => import('./views/Purchases/PurchaseList'))
const Purchase = React.lazy(() => import('./views/Purchases/AddUpdatePurchase'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/PurchsaseList', name: 'PurchaseList', element: PurchaseList },
  { path: '/Purchase/:id', name: 'Purchase', element: Purchase },
]

export default routes
