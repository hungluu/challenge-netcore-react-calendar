using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAPI.API.Application.Queries;
using WebAPI.API.Infrastructure.ResponseModels;

namespace WebAPI.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ShopsController : ControllerBase
    {
        private readonly IShopQueries _shopQueries;

        public ShopsController(IShopQueries shopQueries)
        {
            _shopQueries = shopQueries;
        }

        // GET api/shops
        [HttpGet]
        [ProducesResponseType(typeof(ShopListResponseModel), (int)HttpStatusCode.OK)]
        public async Task<RestListResponseModel<List<ShopViewModel>>> Get()
        {
            List<ShopViewModel> shops;

            try
            {
                shops = await _shopQueries.GetShopsAsync();
            }
            catch
            {
                shops = new List<ShopViewModel>();
            }

            return new ShopListResponseModel(shops);
        }
    }
}
