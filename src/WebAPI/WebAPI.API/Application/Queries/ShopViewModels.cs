using System.Collections.Generic;

namespace WebAPI.API.Application.Queries
{
    public class Shop
    {
        public string Name { get; set; }
        public List<ShopLocation> ShopLocations { get; set; }
    }

    public class ShopLocation
    {
        public string Name { get; set; }
        public List<ShiftSetting> ShiftSettings { get; set; }
    }

    public class ShiftSetting
    {
        public string Rule { get; set; }
        public int Quantity { get; set; }
    }
}
