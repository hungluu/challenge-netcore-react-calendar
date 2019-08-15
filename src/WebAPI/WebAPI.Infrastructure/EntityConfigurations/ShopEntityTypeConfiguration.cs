using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAPI.Domain.Aggregates.ShopAggregate;

namespace WebAPI.Infrastructure.EntityConfigurations
{
    class ShopEntityTypeConfiguration : IEntityTypeConfiguration<Shop>
    {
        public void Configure(EntityTypeBuilder<Shop> shopBuilder)
        {
            shopBuilder.ToTable("shops", WebAPIContext.DEFAULT_SCHEMA);

            shopBuilder.HasKey(s => s.Id);
            shopBuilder.Ignore(s => s.DomainEvents);

            shopBuilder.Property(s => s.Id)
                .ForSqlServerUseSequenceHiLo("shops_seq", WebAPIContext.DEFAULT_SCHEMA);
            shopBuilder.Property<string>("Name")
                .IsRequired();
        }
    }
}
