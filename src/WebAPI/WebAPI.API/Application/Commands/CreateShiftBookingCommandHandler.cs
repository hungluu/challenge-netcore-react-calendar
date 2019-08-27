using MediatR;
using System.Threading;
using System.Threading.Tasks;
using WebAPI.Domain.Aggregates.EmployeeAggregate;

namespace WebAPI.API.Application.Commands
{
    public class CreateShiftBookingCommandHandler : IRequestHandler<CreateShiftBookingCommand, bool>
    {
        private readonly IEmployeeRepository _employeeRepository;

        public CreateShiftBookingCommandHandler(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public async Task<bool> Handle(CreateShiftBookingCommand command, CancellationToken cancellationToken)
        {
            // For the simplicity of demonstration
            // instead of triggering domain events
            // data will be saved directly inside command handler
            var employeeId = command.EmployeeId;
            var employee = await _employeeRepository.GetAsync(employeeId);

            if (employee == null)
            {
                return false;
            }

            employee.AddShiftBooking(command.FromDateTime, command.ToDateTime, command.LocationId);

            return await _employeeRepository.UnitOfWork
                .SaveChangesAsync() > 0;
        }
    }
}
