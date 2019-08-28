using System.Collections.Generic;
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

            List<ShiftSetting> newShiftSettings = new List<ShiftSetting>();

            foreach (var setting in command.ShiftSettings)
            {
                newShiftSettings.Add(new ShiftSetting(setting.Rule, setting.Quantity, setting.LocationId));
            }

            shop.UpdateShiftSettings(newShiftSettings);

            return await _shopRepository.UnitOfWork
                .SaveChangesAsync() > 0;
        }
    }
}
