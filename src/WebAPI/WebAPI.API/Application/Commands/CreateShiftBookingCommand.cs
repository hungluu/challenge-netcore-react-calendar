using MediatR;
using System;
using System.Runtime.Serialization;

namespace WebAPI.API.Application.Commands
{
    public class CreateShiftBookingCommand : IRequest<bool>
    {
        [DataMember]
        public DateTime FromDateTime { get; private set; }

        [DataMember]
        public DateTime ToDateTime { get; private set; }

        [DataMember]
        public int LocationId { get; private set; }

        [DataMember]
        public int EmployeeId { get; private set; }

        public CreateShiftBookingCommand(int employeeId, DateTime fromDateTime, DateTime toDateTime, int locationId)
        {
            EmployeeId = employeeId;
            FromDateTime = fromDateTime;
            ToDateTime = toDateTime;
            LocationId = locationId;
        }
    }
}
