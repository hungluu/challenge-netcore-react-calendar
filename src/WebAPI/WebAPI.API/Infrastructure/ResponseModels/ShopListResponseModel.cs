using System.Collections.Generic;
using WebAPI.API.Application.Queries;

namespace WebAPI.API.Infrastructure.ResponseModels
{
    public class ShopListResponseModel : RestListResponseModel<List<ShopViewModel>>
    {
        public ShopListResponseModel(List<ShopViewModel> shopList) : base(shopList)
        {
        }
    }
}
