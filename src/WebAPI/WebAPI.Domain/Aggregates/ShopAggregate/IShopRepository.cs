using System.Threading.Tasks;
using WebAPI.Domain.Seedworks;

namespace WebAPI.Domain.Aggregates.ShopAggregate
{
    public interface IShopRepository : IRepository<Shop>
    {
        Shop Add(Shop shop);
        void Update(Shop shop);
        Task<Shop> GetAsync(int shopId);
    }
}
