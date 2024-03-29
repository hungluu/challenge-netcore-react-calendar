﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebAPI.API.Application.Queries
{
    public interface IEmployeeQueries
    {
        Task<List<EmployeeViewModel>> GetEmployeesAsync();

        Task<List<ShiftBookingViewModel>> GetShiftBookingsFromEmployeeAsync(int employeeId);

        Task<ShiftBookingViewModel> GetShiftBookingAsync(int employeeId, int locationId, DateTime fromDate, DateTime toDate);
    }
}
