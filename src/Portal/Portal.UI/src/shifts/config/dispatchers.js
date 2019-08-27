import {
    ADD_SHOPS,
    ADD_SHIFT_SETTINGS,
    ADD_EMPLOYEES
} from './actions'
import { ShopService } from './lib'

export const loadShops = function () {
    return async dispatch => {
        const shops = await ShopService.getShops()

        dispatch(ADD_SHOPS(shops))
    }
}

export const loadShiftSettings = function (shopId) {
    return async dispatch => {
        const shiftSettings = await ShopService.getShiftSettingsFromShop(shopId)

        dispatch(ADD_SHIFT_SETTINGS(shiftSettings))
    }
}

export const saveShiftSettings = function (shopId, settings) {
    return async dispatch => {
        await ShopService.updateShiftSettings(shopId, settings)

        const shiftSettings = await ShopService.getShiftSettingsFromShop(shopId)

        dispatch(ADD_SHIFT_SETTINGS(shiftSettings))
    }
}

export const loadEmployees = function () {
    return async dispatch => {
        const employees = await ShopService.getEmployeesFromShop(1)

        dispatch(ADD_EMPLOYEES(employees))
    }
}