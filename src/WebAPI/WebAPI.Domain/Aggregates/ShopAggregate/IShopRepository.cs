using System.Threading.Tasks;
using WebAPI.Domain.Seedworks;

namespace WebAPI.Domain.Aggregates.ShopAggregate
{
    public interface IShopRepository : IRepository<Shop>
    {
        Shop Add(Shop Shop);
        Shop Update(Shop Shop);
        Task<Shop> FindAsync(string id);
    }
}
