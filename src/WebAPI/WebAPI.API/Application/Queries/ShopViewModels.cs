using System.Collections.Generic;

namespace WebAPI.API.Application.Queries
{
    public class ShopViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<ShopLocationViewModel> ShopLocations { get; set; }
    }

    public class ShopLocationViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<ShiftSettingViewModel> ShiftSettings { get; set; }
    }

    public class ShiftSettingViewModel
    {
        public int Id { get; set; }
        public string Rule { get; set; }
        public int Quantity { get; set; }
        public int LocationId { get; set; }
        public bool IsDeleted { get; set; }

        public ShiftSettingViewModel()
        {
            IsDeleted = false;
        }
    }
}
