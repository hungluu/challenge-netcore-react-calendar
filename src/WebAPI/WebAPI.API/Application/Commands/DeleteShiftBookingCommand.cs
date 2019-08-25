using MediatR;
using System.Runtime.Serialization;

namespace WebAPI.API.Application.Commands
{
    public class DeleteShiftBookingCommand : IRequest<bool>
    {
        [DataMember]
        public int BookingId { get; private set; }

        [DataMember]
        public int EmployeeId { get; private set; }

        public DeleteShiftBookingCommand(int employeeId, int shiftBookingId)
        {
            EmployeeId = employeeId;
            BookingId = shiftBookingId;
        }
    }
}
