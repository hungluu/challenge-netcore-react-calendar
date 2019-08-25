using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace WebAPI.API.Application.Queries
{
    public class EmployeeQueries : IEmployeeQueries
    {
        private string _connectionString;

        public EmployeeQueries(string constr)
        {
            _connectionString = !string.IsNullOrWhiteSpace(constr)
                ? constr
                : throw new ArgumentNullException(nameof(constr));
        }

        public async Task<List<EmployeeViewModel>> GetEmployeesAsync()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                var results = await connection.QueryAsync<EmployeeViewModel>(
                    @"SELECT e.[Id] as Id, e.[Name] as Name
                        FROM [EliteDemoSchema].[employees] e"
                );

                return results.AsList();
            }
        }

        public async Task<List<ShiftBookingViewModel>> GetShiftBookingsFromEmployeeAsync(int employeeId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                var results = await connection.QueryAsync<ShiftBookingViewModel>(
                    @"SELECT b.[Id] as Id,
                            b.[FromDateTime] as FromDateTime,
                            b.[ToDateTime] as ToDateTime,
                            b.[LocationId] as LocationId
                        FROM [EliteDemoSchema].[shift_bookings] b
                        WHERE b.EmployeeId = @employeeId",
                    new { employeeId }
                );

                return results.AsList();
            }
        }
    }
}
