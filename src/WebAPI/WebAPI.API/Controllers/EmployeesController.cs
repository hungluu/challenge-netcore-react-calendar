using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using WebAPI.API.Application.Commands;
using WebAPI.API.Application.Queries;

namespace WebAPI.API.Controllers
{
    [Route("v1/[controller]")]
    [ApiController]
    public class EmployeesController
    {
        private readonly IEmployeeQueries _employeeQueries;
        private readonly IMediator _mediator;

        public EmployeesController(IEmployeeQueries employeeQueries, IMediator mediator)
        {
            _employeeQueries = employeeQueries;
            _mediator = mediator;
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<EmployeeViewModel>), (int)HttpStatusCode.OK)]
        public async Task<List<EmployeeViewModel>> Get()
        {
            return await _employeeQueries.GetEmployeesAsync();
        }

        [Route("{employeeId:int}/shift_bookings")]
        [HttpGet]
        [ProducesResponseType(typeof(List<ShiftBookingViewModel>), (int)HttpStatusCode.OK)]
        public async Task<List<ShiftBookingViewModel>> GetShiftSettngs(int employeeId)
        {
            return await _employeeQueries.GetShiftBookingsFromEmployeeAsync(employeeId);
        }

        [Route("{employeeId:int}/shift_bookings")]
        [HttpPost]
        public async Task<object> CreateShiftBooking(int employeeId, [FromBody]ShiftBookingViewModel booking)
        {
            bool commandResult = await _mediator.Send(new CreateShiftBookingCommand(employeeId, booking.FromDateTime, booking.ToDateTime, booking.LocationId));

            return new
            {
                Created = commandResult
                    ? await _employeeQueries.GetShiftBookingAsync(employeeId, booking.LocationId, booking.FromDateTime, booking.ToDateTime)
                    : null
            };
        }

        [Route("{employeeId:int}/shift_bookings/{bookingId:int}")]
        [HttpDelete]
        public async Task<object> DeleteShiftBooking(int employeeId, int bookingId)
        {
            bool commandResult = await _mediator.Send(new DeleteShiftBookingCommand(employeeId, bookingId));

            return new
            {
                Deleted = commandResult
            };
        }
    }
}
