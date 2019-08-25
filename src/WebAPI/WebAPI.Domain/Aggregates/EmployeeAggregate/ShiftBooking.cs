using System;
using WebAPI.Domain.Seedworks;

namespace WebAPI.Domain.Aggregates.EmployeeAggregate
{
    public class ShiftBooking: Entity
    {
        private DateTime _fromDateTime;
        private DateTime _toDateTime;
        private int _locationId;

        private ShiftBooking()
        {
        }

        public ShiftBooking(DateTime fromDateTime, DateTime toDateTime, int locationId) : base()
        {
            _fromDateTime = fromDateTime;
            _toDateTime = toDateTime;
            _locationId = locationId;
        }

        public DateTime GetToDateTime() => _toDateTime;
        public DateTime GetFromDateTime() => _fromDateTime;
        public int GetLocationId() => _locationId;
    }
}
