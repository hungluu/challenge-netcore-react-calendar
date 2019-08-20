using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using WebAPI.Domain.Aggregates.ShopAggregate;
using WebAPI.Domain.Seedworks;

namespace WebAPI.Infrastructure.Repositories
{
    public class ShopRepository : IShopRepository
    {
        private readonly WebApiContext _context;

        public IUnitOfWork UnitOfWork
        {
            get
            {
                return _context;
            }
        }

        public ShopRepository(WebApiContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public Shop Add(Shop shop)
        {
            return _context.Shops.Add(shop).Entity;

        }

        public async Task<Shop> GetAsync(int shopId)
        {
            var shop = await _context.Shops.FindAsync(shopId);
            if (shop != null)
            {
                await _context.Entry(shop)
                    .Collection(i => i.ShopLocations).LoadAsync();
            }

            return shop;
        }

        public void Update(Shop shop)
        {
            _context.Entry(shop).State = EntityState.Modified;
        }
    }
}
