import React from 'react'

const ShiftSettings = React.lazy(() => import('../../shifts/ShiftSettings'))

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/dashboard', name: 'Dashboard', component: ShiftSettings }
]

export default routes
