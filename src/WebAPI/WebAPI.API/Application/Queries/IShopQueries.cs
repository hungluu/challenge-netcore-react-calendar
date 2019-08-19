using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebAPI.API.Application.Queries
{
    public interface IShopQueries
    {
        Task<List<ShopViewModel>> GetShopsAsync();

        Task<List<ShopLocationViewModel>> GetShopLocationsFromShopAsync(int shopId);

        Task<ShopLocationViewModel> GetLocationAsync(int locationId);
    }
}
