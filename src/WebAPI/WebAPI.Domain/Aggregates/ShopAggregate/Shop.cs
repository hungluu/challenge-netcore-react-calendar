using System.Collections.Generic;
using WebAPI.Domain.Seedworks;

namespace WebAPI.Domain.Aggregates.ShopAggregate
{
    public class Shop: Entity, IAggregateRoot
    {
        private string _name;

        private readonly List<ShopLocation> _shopLocations;
        public IReadOnlyCollection<ShopLocation> ShopLocations => _shopLocations;

        protected Shop()
        {
            _shopLocations = new List<ShopLocation>();
        }

        public Shop(string shopName)
        {
            _name = shopName;
        }

        public string GetName() => _name;
    }
}
