import { map, find, uniqBy, assign } from 'lodash'
import request from '../config/request'

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
    async updateShiftSettings (shopId, shiftSettings) {
        if (!shopId) {
            throw Error('Shop id is empty')
        }

        let updatedShiftSettings = map(uniqBy(shiftSettings, 'id'), st => assign({}, st, {
            id: st.isNew ? null : st.id
        }))

        request.patch(`shops/${shopId}/shift_settings`, updatedShiftSettings)
    },

    async getShops() {
        const shopRes = await request.get('shops')
        const shops = shopRes.data.data || []
        
        return this.mapShopViewModels(shops)
    },

    async getShopLocationsFromShop(shopId) {
        if (!shopId) {
            return []
        }

        const locationRes = await request.get(`shops/${shopId}/locations`)
        const locations = locationRes.data.data || []
        
        return this.mapShopViewModels(locations)
    },

    async getShiftSettingsFromShop(shopId) {
        if (!shopId) {
            return []
        }

        const shiftSettingRes = await request.get(`shops/${shopId}/shift_settings`)
        const shiftSettings = shiftSettingRes.data.data || []

        return this.mapShiftSettingViewModels(shopId, shiftSettings)
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

    mapShiftSettingViewModels(shopId, settings) {
        return map(settings, ({ id, locationId, rule }) => {
            return {
                id,
                rule,
                locationId,
                shopId: shopId,
                isDeleted: false
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