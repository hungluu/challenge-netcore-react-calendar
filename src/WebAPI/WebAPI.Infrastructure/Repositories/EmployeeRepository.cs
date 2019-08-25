using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using WebAPI.Domain.Aggregates.EmployeeAggregate;
using WebAPI.Domain.Seedworks;

namespace WebAPI.Infrastructure.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        public async Task<Employee> GetAsync(int employeeId)
        {
            var employee = await _context.Employees.FindAsync(employeeId);
            if (employee != null)
            {
                await _context.Entry(employee)
                    .Collection(i => i.ShiftBookings).LoadAsync();
            }

            return employee;
        }

        public void Update(Employee employee)
        {
            _context.Entry(employee).State = EntityState.Modified;
        }

        private readonly WebApiContext _context;

        public IUnitOfWork UnitOfWork
        {
            get
            {
                return _context;
            }
        }

        public EmployeeRepository(WebApiContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }
    }
}
