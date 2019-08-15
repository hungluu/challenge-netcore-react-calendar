using WebAPI.Domain.Seedworks;

namespace WebAPI.Domain.Aggregates.ShopAggregate
{
    public class ShiftSetting: Entity
    {
        private int _quantity;
        private string _rule;

        protected ShiftSetting()
        {
        }

        public ShiftSetting(string shiftRule, int shiftQuantity)
        {
            _quantity = shiftQuantity;
            _rule = shiftRule;
        }

        public string GetRule() => _rule;
        public int GetQuantity() => _quantity;
    }
}
