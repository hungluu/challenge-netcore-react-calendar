using System.Threading;
using System.Threading.Tasks;
using MediatR;
using WebAPI.Domain.Aggregates.ShopAggregate;

namespace WebAPI.API.Application.Commands
{
    public class UpdateShiftSettingsCommandHandler : IRequestHandler<UpdateShiftSettingsCommand, bool>
    {
        private readonly IShopRepository _shopRepository;

        public UpdateShiftSettingsCommandHandler(IShopRepository shopRepository)
        {
            _shopRepository = shopRepository;
        }

        public async Task<bool> Handle(UpdateShiftSettingsCommand command, CancellationToken cancellationToken)
        {
            // For the simplicity of demonstration
            // instead of triggering domain events
            // data will be saved directly inside command handler
            var shopId = command.ShopId;
            var shop = await _shopRepository.GetAsync(shopId);

            if (shop == null)
            {
                return false;
            }

            foreach (var setting in command.ShiftSettings)
            {
                int? settingId = setting.Id;
                if (setting.IsDeleted)
                {
                    shop.RemoveShiftSetting(setting.Id);
                }
                else if (settingId != null && settingId != 0)
                {
                    shop.RemoveShiftSetting(setting.Id);
                    shop.AddShiftSetting(setting.Rule, setting.Quantity, setting.LocationId);
                }
                else
                {
                    shop.AddShiftSetting(setting.Rule, setting.Quantity, setting.LocationId);
                }
            }

            return await _shopRepository.UnitOfWork
                .SaveChangesAsync() > 0;
        }
    }
}
