import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const PurchaseList = React.lazy(() => import('./views/pages/Purchases/PurchaseList'))
const Purchase = React.lazy(() => import('./views/pages/Purchases/AddUpdatePurchase'))
const StoreOperation = React.lazy(() => import('./views/pages/Stores/AddUpdateStores'))
const StoreList = React.lazy(() => import('./views/pages/Stores/StoresList'))
const PCategoryOperation = React.lazy(() => import('./views/pages/purchase Categories/AddUpdatePCategory'))
const PCategoryList = React.lazy(() => import('./views/pages/purchase Categories/PCategoryList'))
const PSCategoryOperation = React.lazy(() => import('./views/pages/purchase sub Categories/AddUpdatePSCategory'))
const PSCategoryList = React.lazy(() => import('./views/pages/purchase sub Categories/PSCategoryList'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/PurchsaseList', name: 'PurchaseList', element: PurchaseList },
  { path: '/Purchase/:id', name: 'Purchase', element: Purchase },
  { path: '/Store/:id', name: 'StoreOperation', element: StoreOperation },
  { path: '/StoreList', name: 'StoreList', element: StoreList },
  { path: '/Purchase_Category/:id', name: 'PCategoryOperation', element: PCategoryOperation },
  { path: '/PCategoryList', name: 'PCategoryList', element: PCategoryList },
  { path: '/PSCategory/:id', name: 'PSCategoryOperation', element: PSCategoryOperation },
  { path: '/PSCategoryList', name: 'PSCategoryList', element: PSCategoryList },
]

export default routes
