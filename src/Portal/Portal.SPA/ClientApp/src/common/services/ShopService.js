import { map, find } from 'lodash'

const testShops = [
    {
        id: 1,
        name: 'Vincom',
        locations: [
            {
                id: 1,
                name: 'Vincom DBP'
            },
            {
                id: 2,
                name: 'Vincom BD'
            }
        ],
        shiftSettings: [
            {
                id: 1,
                rule: `DTSTART:20190704T080000Z
                RRULE:UNTIL=20190907T120000Z;BYDAY=MO,TU,TH,FR,SA,SU`,
                locationId: 1
            },
            {
                id: 2,
                rule: `DTSTART:20190704T133000Z
                RRULE:UNTIL=20190907T173000Z;BYDAY=MO,TU,WE,TH,SA,SU`,
                locationId: 1
            },
            // {
            //     id: 3,
            //     rule: `DTSTART:20190704T090000Z
            //     RRULE:UNTIL=20190907T130000Z;BYDAY=MO,TU,WE,TH,FR`,
            //     locationId: 2
            // },
            {
                id: 4,
                rule: `DTSTART:20190704T170000Z
                RRULE:UNTIL=20190907T220000Z;BYDAY=MO,TU,WE,TH`,
                locationId: 2
            }
        ],
        employees: [
            {
                id: 1,
                name: 'Henry'
            },
            {
                id: 2,
                name: 'Karen'
            },
            {
                id: 3,
                name: 'Oggy'
            }
        ]
    }
]

const ShopService = {
    async updateShiftSettings (shopId, locationId, shiftSettings) {
        console.log({
            shopId, locationId, shiftSettings
        })
    },

    async getShops() {
        return this.mapShopViewModels(testShops)
    },

    async getShopLocationsFromShop(shopId) {
        const shop = find(testShops, { id: shopId })

        return shop
            ? this.mapShopLocationViewModels(shop.locations)
            : []
    },

    async getShiftSettingsFromShop(shopId) {
        const shop = find(testShops, { id: shopId })

        return shop
            ? this.mapShiftSettingViewModels(shop, shop.shiftSettings)
            : []
    },

    async getEmployeesFromShop(shopId) {
        const shop = find(testShops, { id: shopId })

        return shop
            ? this.mapShopEmployeeViewModels(shop.employees)
            : []
    },

    mapShopViewModels(shops) {
        return map(shops, ({ id, name }) => {
            return {
                id,
                name
            }
        })
    },

    mapShiftSettingViewModels(shop, settings) {
        return map(settings, ({ id, locationId, rule }) => {
            const location = find(shop.locations, { id: locationId })

            return {
                id,
                rule,
                locationId,
                locationName: location.name
            }
        })
    },

    mapShopEmployeeViewModels(employees) {
        return map(employees, ({ id, name }) => {
            return {
                id,
                name
            }
        })
    },

    mapShopLocationViewModels(locations) {
        return map(locations, ({ id, name }) => {
            return {
                id,
                name
            }
        })
    }
}

export default ShopService