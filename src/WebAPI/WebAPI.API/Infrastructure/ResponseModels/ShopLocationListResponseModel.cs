using System.Collections.Generic;
using WebAPI.API.Application.Queries;

namespace WebAPI.API.Infrastructure.ResponseModels
{
    public class ShopLocationListResponseModel : RestListResponseModel<List<ShopLocationViewModel>>
    {
        public ShopLocationListResponseModel(List<ShopLocationViewModel> locationList) : base(locationList)
        {
        }
    }
}
