using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using WebAPI.API.Application.Commands;
using WebAPI.API.Application.Queries;

namespace WebAPI.API.Controllers
{
    [Route("v1/[controller]")]
    [ApiController]
    public class ShopsController : ControllerBase
    {
        private readonly IShopQueries _shopQueries;
        private readonly IMediator _mediator;

        public ShopsController(IShopQueries shopQueries, IMediator mediator)
        {
            _shopQueries = shopQueries;
            _mediator = mediator;
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<ShopViewModel>), (int)HttpStatusCode.OK)]
        public async Task<List<ShopViewModel>> Get()
        {
            return await _shopQueries.GetShopsAsync();
        }

        [Route("{shopId:int}/locations")]
        [HttpGet]
        [ProducesResponseType(typeof(List<ShopLocationViewModel>), (int)HttpStatusCode.OK)]
        public async Task<List<ShopLocationViewModel>> GetLocations(int shopId)
        {
            return await _shopQueries.GetShopLocationsFromShopAsync(shopId);
        }

        [Route("{shopId:int}/shift_settings")]
        [HttpGet]
        [ProducesResponseType(typeof(List<ShiftSettingViewModel>), (int)HttpStatusCode.OK)]
        public async Task<List<ShiftSettingViewModel>> GetShiftSettngs(int shopId)
        {
            return await _shopQueries.GetShopShiftSettingsAsync(shopId);
        }

        [Route("{shopId:int}/shift_settings")]
        [HttpPatch]
        public async Task<object> CreateShiftSettngs([FromBody]List<ShiftSettingViewModel> shiftSettings, int shopId)
        {
            bool commandResult = await _mediator.Send(new UpdateShiftSettingsCommand(shopId, shiftSettings));

            return new
            {
                Updated = commandResult
            };
        }
    }
}
