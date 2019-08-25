using MediatR;
using System.Collections.Generic;
using System.Runtime.Serialization;
using WebAPI.API.Application.Queries;

namespace WebAPI.API.Application.Commands
{
    public class UpdateShiftSettingsCommand : IRequest<bool>
    {
        [DataMember]
        public List<ShiftSettingViewModel> ShiftSettings { get; private set; }
        [DataMember]
        public int ShopId { get; private set; }

        public UpdateShiftSettingsCommand(int shopId, List<ShiftSettingViewModel> shiftSettings)
        {
            ShiftSettings = shiftSettings;
            ShopId = shopId;
        }
    }
}
