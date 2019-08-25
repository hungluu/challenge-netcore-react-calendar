using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAPI.Domain.Aggregates.EmployeeAggregate;

namespace WebAPI.Infrastructure.EntityConfigurations
{
    class EmployeeEntityTypeConfiguration : IEntityTypeConfiguration<Employee>
    {
        public void Configure(EntityTypeBuilder<Employee> settingBuilder)
        {
            settingBuilder.ToTable("employees", WebApiContext.DEFAULT_SCHEMA);

            settingBuilder.HasKey(s => s.Id);
            settingBuilder.Ignore(s => s.DomainEvents);

            settingBuilder.Property(s => s.Id)
                .ForSqlServerUseSequenceHiLo("employee_seq", WebApiContext.DEFAULT_SCHEMA);
            settingBuilder.Property<string>("Name")
                .IsRequired();
        }
    }
}
