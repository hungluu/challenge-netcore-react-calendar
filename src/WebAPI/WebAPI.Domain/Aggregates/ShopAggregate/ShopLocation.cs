using System.Collections.Generic;
using WebAPI.Domain.Seedworks;

namespace WebAPI.Domain.Aggregates.ShopAggregate
{
    public class ShopLocation: Entity
    {
        private string _name;

        private readonly List<ShiftSetting> _shiftSettings;
        public IReadOnlyCollection<ShiftSetting> ShiftSettings => _shiftSettings;

        protected ShopLocation()
        {
            _shiftSettings = new List<ShiftSetting>();
        }

        public ShopLocation(string locationName)
        {
            _name = locationName;
        }

        public string GetName() => _name;
    }
}
