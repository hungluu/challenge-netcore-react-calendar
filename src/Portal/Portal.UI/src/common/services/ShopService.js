import { map, uniqBy, assign } from 'lodash'
import request from '../config/request'

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
        if (!shopId) {
            return []
        }

        const employeeRes = await request.get(`employees`)
        const employees = employeeRes.data.data || []

        return this.mapShopEmployeeViewModels(employees)
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