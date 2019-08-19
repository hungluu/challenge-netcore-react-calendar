using System.Collections.Generic;
using WebAPI.API.Application.Queries;

namespace WebAPI.API.Infrastructure.ResponseModels
{
    public class ShiftSettingListResponseModel : RestListResponseModel<List<ShiftSettingViewModel>>
    {
        public ShiftSettingListResponseModel(List<ShiftSettingViewModel> shiftSettingList) : base(shiftSettingList)
        {
        }
    }
}
