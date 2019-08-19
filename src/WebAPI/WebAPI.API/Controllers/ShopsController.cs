using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using WebAPI.API.Application.Commands;
using WebAPI.API.Application.Queries;
using WebAPI.API.Infrastructure.ResponseModels;

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
        [ProducesResponseType(typeof(ShopListResponseModel), (int)HttpStatusCode.OK)]
        public async Task<ShopListResponseModel> Get()
        {
            return new ShopListResponseModel(await _shopQueries.GetShopsAsync());
        }

        [Route("{shopId:int}/locations")]
        [HttpGet]
        [ProducesResponseType(typeof(ShopLocationListResponseModel), (int)HttpStatusCode.OK)]
        public async Task<ShopLocationListResponseModel> GetLocations(int shopId)
        {
            return new ShopLocationListResponseModel(await _shopQueries.GetShopLocationsFromShopAsync(shopId));
        }

        [Route("{shopId:int}/shift_settings")]
        [HttpGet]
        [ProducesResponseType(typeof(ShiftSettingListResponseModel), (int)HttpStatusCode.OK)]
        public async Task<ShiftSettingListResponseModel> GetShiftSettngs(int shopId)
        {
            return new ShiftSettingListResponseModel(await _shopQueries.GetShopShiftSettingsAsync(shopId));
        }

        [Route("{shopId:int}/shift_settings")]
        [HttpPatch]
        [ProducesResponseType(typeof(IActionResult), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> CreateShiftSettngs([FromBody]List<ShiftSettingDTO> shiftSettings, int shopId)
        {
            bool commandResult = await _mediator.Send(new CreateShiftSettingCommand(shopId, shiftSettings));


            if (!commandResult)
            {
                return BadRequest();
            }

            return Ok();
        }
    }
}
