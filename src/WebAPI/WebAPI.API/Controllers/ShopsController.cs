using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAPI.API.Application.Queries;
using WebAPI.API.Infrastructure;

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
        [ProducesResponseType(typeof(RestSuccessViewModel<List<ShopViewModel>>), (int)HttpStatusCode.OK)]
        public async Task<RestSuccessViewModel<List<ShopViewModel>>> Get()
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

            return new RestSuccessViewModel<List<ShopViewModel>>
            {
                data = shops
            };
        }
    }
}
