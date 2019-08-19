using System.Threading;
using System.Threading.Tasks;
using MediatR;
using WebAPI.Domain.Aggregates.ShopAggregate;

namespace WebAPI.API.Application.Commands
{
    public class CreateShiftSettingCommandHandler : IRequestHandler<CreateShiftSettingCommand, bool>
    {
        private readonly IShopRepository _shopRepository;

        public CreateShiftSettingCommandHandler(IShopRepository shopRepository)
        {
            _shopRepository = shopRepository;
        }

        public async Task<bool> Handle(CreateShiftSettingCommand command, CancellationToken cancellationToken)
        {
            var shopId = command.ShopId;
            var shop = await _shopRepository.GetAsync(shopId);

            if (shop == null)
            {
                return false;
            }

            foreach (var setting in command.ShiftSettings)
            {
                if (setting.Id == null || setting.Id == 0)
                {
                    shop.AddShiftSetting(setting.Rule, setting.Quantity, setting.LocationId);
                }
            }

            // for the simpleness of demonstration
            // instead of trigger domain events
            // data will be saved directly inside event handler
            return await _shopRepository.UnitOfWork
                .SaveChangesAsync() > 0;
        }
    }
}
