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

        [HttpGet]
        [ProducesResponseType(typeof(ShopListResponseModel), (int)HttpStatusCode.OK)]
        public async Task<ShopListResponseModel> Get()
        {
            List<ShopViewModel> shops;

            return new ShopListResponseModel(await _shopQueries.GetShopsAsync());
        }

        [Route("{shopId:int}/locations")]
        [HttpGet]
        [ProducesResponseType(typeof(ShopLocationListResponseModel), (int)HttpStatusCode.OK)]
        public async Task<ShopLocationListResponseModel> GetShopLocations(int shopId)
        {
            List<ShopViewModel> shops;

            return new ShopLocationListResponseModel(await _shopQueries.GetShopLocationsFromShopAsync(shopId));
        }
    }
}
