using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using WebAPI.Domain.Aggregates.EmployeeAggregate;

namespace WebAPI.Infrastructure.EntityConfigurations
{
    class ShiftBookingEntityTypeConfiguration : IEntityTypeConfiguration<ShiftBooking>
    {
        public void Configure(EntityTypeBuilder<ShiftBooking> settingBuilder)
        {
            settingBuilder.ToTable("shift_bookings", WebApiContext.DEFAULT_SCHEMA);

            settingBuilder.HasKey(s => s.Id);
            settingBuilder.Ignore(s => s.DomainEvents);

            settingBuilder.Property(s => s.Id)
                .ForSqlServerUseSequenceHiLo("ship_bookings_seq", WebApiContext.DEFAULT_SCHEMA);
            settingBuilder.Property<DateTime>("ToDateTime")
                .IsRequired();
            settingBuilder.Property<DateTime>("FromDateTime")
                .IsRequired();
            settingBuilder.Property<int>("LocationId")
                .IsRequired();
        }
    }
}
