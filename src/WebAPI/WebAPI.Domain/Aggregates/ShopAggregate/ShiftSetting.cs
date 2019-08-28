using WebAPI.Domain.Seedworks;

namespace WebAPI.Domain.Aggregates.ShopAggregate
{
    public class ShiftSetting: Entity
    {
        private int _quantity;
        private string _rule;
        private int _locationId;

        public ShiftSetting()
        {
        }

        public ShiftSetting(string shiftRule, int shiftQuantity, int locationId) : base()
        {
            _quantity = shiftQuantity;
            _rule = shiftRule;
            _locationId = locationId;
        }

        public string GetRule() => _rule;
        public int GetQuantity() => _quantity;
        public int GetLocationId() => _locationId;
    }
}
