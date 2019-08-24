import { map, find } from 'lodash'

const testShops = [
    {
        id: 1,
        name: 'Shit1',
        locations: [
            {
                id: 1,
                name: 'Shit1-Lord1'
            },
            {
                id: 2,
                name: 'Shit1-Lord2'
            }
        ]
    },
    {
        id: 2,
        name: 'Shit2',
        locations: [
            {
                id: 1,
                name: 'Shit2-Lord1'
            },
            {
                id: 2,
                name: 'Shit2-Lord2'
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

    mapShopViewModels(shops) {
        return map(shops, ({ id, name }) => {
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