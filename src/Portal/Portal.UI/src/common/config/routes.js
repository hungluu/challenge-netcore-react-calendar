import React from 'react'

const ShiftSettings = React.lazy(() => import('../../shifts/ShiftSettings'))
const ShiftBooking = React.lazy(() => import('../../shifts/ShiftBooking'))

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/shifts/booking', name: 'Shift Booking', component: ShiftBooking },
    { path: '/shifts/settings', name: 'Shift Settings', component: ShiftSettings }
]

export default routes
