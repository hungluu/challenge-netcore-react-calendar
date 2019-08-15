using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAPI.Domain.Aggregates.ShopAggregate;

namespace WebAPI.Infrastructure.EntityConfigurations
{
    class ShopLocationEntityTypeConfiguration : IEntityTypeConfiguration<ShopLocation>
    {
        public void Configure(EntityTypeBuilder<ShopLocation> locationConfiguration)
        {
            locationConfiguration.ToTable("shop_locations", WebAPIContext.DEFAULT_SCHEMA);

            locationConfiguration.HasKey(l => l.Id);
            locationConfiguration.Ignore(l => l.DomainEvents);

            locationConfiguration.Property(l => l.Id)
                .ForSqlServerUseSequenceHiLo("shop_locations_seq");
            locationConfiguration.Property<string>("Name")
                .IsRequired();
        }
    }
}
