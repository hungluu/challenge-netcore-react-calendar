using System.Threading.Tasks;
using WebAPI.Domain.Seedworks;

namespace WebAPI.Domain.Aggregates.EmployeeAggregate
{
    public interface IEmployeeRepository : IRepository<Employee>
    {
        void Update(Employee employee);
        Task<Employee> GetAsync(int employeeId);
    }
}
