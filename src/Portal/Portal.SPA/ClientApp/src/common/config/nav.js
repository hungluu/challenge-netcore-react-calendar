export default {
    items: [
        {
            name: 'Shifts',
            url: '/shifts',
            icon: 'icon-calendar',
            children: [
                {
                    name: 'Calendar (Admin)',
                    url: '/shifts/calendar',
                    icon: 'nav-icon fa fa-calendar'
                },
                {
                    name: 'Booking (Employee)',
                    url: '/shifts/booking',
                    icon: 'nav-icon fa fa-calendar-plus-o'
                },
                {
                    name: 'Settings',
                    url: '/shifts/settings',
                    icon: 'nav-icon cui-cog',
                }
            ]
        },
    ]
};
