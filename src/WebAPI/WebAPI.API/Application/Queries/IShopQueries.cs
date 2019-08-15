using System.Threading.Tasks;

namespace WebAPI.API.Application.Queries
{
    interface IShopQueries
    {
        Task<Shop> GetShopsAsync();

        Task<ShopLocation> GetShopLocationsFromShopAsync(int shopId);

        Task<ShopLocation> GetLocationAsync(int locationId);
    }
}
