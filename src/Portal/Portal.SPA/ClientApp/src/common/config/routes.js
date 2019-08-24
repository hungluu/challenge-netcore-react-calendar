import React from 'react'

const ShiftCalendar = React.lazy(() => import('../../shifts/ShiftCalendar'))
const ShiftSettings = React.lazy(() => import('../../shifts/ShiftSettings'))

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/dashboard', name: 'Shift calendar', component: ShiftCalendar },
    { path: '/shifts/settings', name: 'Shift settings', component: ShiftSettings }
]

export default routes
