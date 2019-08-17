using System.Collections.Generic;
using WebAPI.Domain.Seedworks;

namespace WebAPI.Domain.Aggregates.ShopAggregate
{
    public class Shop: Entity, IAggregateRoot
    {
        private string _name;

        private readonly List<ShopLocation> _shopLocations;
        public IReadOnlyCollection<ShopLocation> ShopLocations => _shopLocations;

        protected Shop() : base()
        {
            _shopLocations = new List<ShopLocation>();
        }

        public Shop(string shopName) : this()
        {
            _name = shopName;
        }

        public string GetName() => _name;

        public void AddLocation(string locationName)
        {
            _shopLocations.Add(new ShopLocation(locationName));
        }
    }
}
