using MediatR;
using System.Collections.Generic;
using System.Runtime.Serialization;
using WebAPI.API.Application.Queries;

namespace WebAPI.API.Application.Commands
{
    public class CreateShiftSettingCommand : IRequest<bool>
    {

        [DataMember]
        public List<ShiftSettingDTO> ShiftSettings { get; private set; }
        [DataMember]
        public int ShopId { get; private set; }

        public CreateShiftSettingCommand(int shopId, List<ShiftSettingDTO> shiftSettings)
        {
            ShiftSettings = shiftSettings;
            ShopId = shopId;
        }
    }

    public class ShiftSettingDTO
    {
        public int? Id { get; set; }
        public string Rule { get; set; }
        public int Quantity { get; set; }
        public int LocationId { get; set; }
    }
}
