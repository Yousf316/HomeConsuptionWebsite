import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const PurchaseList = React.lazy(() => import('./views/pages/Purchases/PurchaseList'))
const Purchase = React.lazy(() => import('./views/pages/Purchases/AddUpdatePurchase'))
const StoreOperation = React.lazy(() => import('./views/pages/Stores/AddUpdateStores'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/PurchsaseList', name: 'PurchaseList', element: PurchaseList },
  { path: '/Purchase/:id', name: 'Purchase', element: Purchase },
  { path: '/Store/:id', name: 'StoreOperation', element: StoreOperation },
]

export default routes
