using System;
using System.Collections.Generic;
using WebAPI.Domain.Seedworks;

namespace WebAPI.Domain.Aggregates.EmployeeAggregate
{
    public class Employee : Entity, IAggregateRoot
    {
        private string _name;

        private readonly List<ShiftBooking> _shiftBookings;
        public IReadOnlyCollection<ShiftBooking> ShiftBookings => _shiftBookings;

        protected Employee() : base()
        {
            _shiftBookings = new List<ShiftBooking>();
        }

        public Employee(string shopName) : this()
        {
            _name = shopName;
        }

        public string GetName() => _name;

        public void AddShiftBooking(DateTime from, DateTime to, int locationId)
        {
            _shiftBookings.Add(new ShiftBooking(from, to, locationId));
        }

        public void RemoveShiftBooking(int id)
        {
            var booking = _shiftBookings.Find(b => b.Id == id);

            if (booking != null)
            {
                _shiftBookings.Remove(booking);
            }
        }
    }
}
