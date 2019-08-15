using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.API.Application.Queries
{
    public class ShopQueries : IShopQueries
    {
        public Task<ShopLocation> GetLocationAsync(int locationId)
        {
            throw new NotImplementedException();
        }

        public Task<ShopLocation> GetShopLocationsFromShopAsync(int shopId)
        {
            throw new NotImplementedException();
        }

        public Task<Shop> GetShopsAsync()
        {
            throw new NotImplementedException();
        }
    }
}
