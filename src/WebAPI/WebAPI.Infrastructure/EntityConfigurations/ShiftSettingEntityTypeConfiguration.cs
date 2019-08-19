using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAPI.Domain.Aggregates.ShopAggregate;

namespace WebAPI.Infrastructure.EntityConfigurations
{
    class ShiftSettingEntityTypeConfiguration : IEntityTypeConfiguration<ShiftSetting>
    {
        public void Configure(EntityTypeBuilder<ShiftSetting> settingBuilder)
        {
            settingBuilder.ToTable("shift_settings", WebApiContext.DEFAULT_SCHEMA);

            settingBuilder.HasKey(s => s.Id);
            settingBuilder.Ignore(s => s.DomainEvents);

            settingBuilder.Property(s => s.Id)
                .ForSqlServerUseSequenceHiLo("ship_settings_seq", WebApiContext.DEFAULT_SCHEMA);
            settingBuilder.Property<string>("Rule")
                .IsRequired();
            settingBuilder.Property<int>("Quantity")
                .IsRequired();
            settingBuilder.Property<int>("LocationId")
                .IsRequired();
        }
    }
}
