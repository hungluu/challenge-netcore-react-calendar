using WebAPI.Domain.Seedworks;

namespace WebAPI.Domain.Aggregates.ShopAggregate
{
    public class ShopLocation: Entity
    {
        private string _name;

        private ShopLocation()
        {
        }

        public ShopLocation(string locationName) : base()
        {
            _name = locationName;
        }

        public string GetName() => _name;
    }
}
