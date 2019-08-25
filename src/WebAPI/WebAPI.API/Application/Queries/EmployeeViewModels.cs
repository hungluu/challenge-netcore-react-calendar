using System;
using System.Collections.Generic;

namespace WebAPI.API.Application.Queries
{
    public class EmployeeViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<ShiftBookingViewModel> ShiftBookings { get; set; }
    }

    public class ShiftBookingViewModel
    {
        public int Id { get; set; }
        public DateTime FromDateTime { get; set; }
        public DateTime ToDateTime { get; set; }
        public int LocationId { get; set; }
        public bool IsDeleted { get; set; }

        public ShiftBookingViewModel()
        {
            IsDeleted = false;
        }
    }
}
