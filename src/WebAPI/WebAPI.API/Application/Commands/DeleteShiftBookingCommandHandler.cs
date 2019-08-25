using MediatR;
using System.Threading;
using System.Threading.Tasks;
using WebAPI.Domain.Aggregates.EmployeeAggregate;

namespace WebAPI.API.Application.Commands
{
    public class DeleteShiftBookingCommandHandler : IRequestHandler<DeleteShiftBookingCommand, bool>
    {
        private readonly IEmployeeRepository _employeeRepository;

        public DeleteShiftBookingCommandHandler(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public async Task<bool> Handle(DeleteShiftBookingCommand command, CancellationToken cancellationToken)
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

            employee.RemoveShiftBooking(command.BookingId);

            return await _employeeRepository.UnitOfWork
                .SaveChangesAsync() > 0;
        }
    }
}
