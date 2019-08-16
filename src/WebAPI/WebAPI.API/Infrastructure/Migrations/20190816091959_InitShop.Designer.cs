﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebAPI.Infrastructure;

namespace WebAPI.Infrastructure.Migrations
{
    [DbContext(typeof(WebAPIContext))]
    [Migration("20190816091959_InitShop")]
    partial class InitShop
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("Relational:Sequence:.shop_locations_seq", "'shop_locations_seq', '', '1', '10', '', '', 'Int64', 'False'")
                .HasAnnotation("Relational:Sequence:EliteDemoSchema.ship_settings_seq", "'ship_settings_seq', 'EliteDemoSchema', '1', '10', '', '', 'Int64', 'False'")
                .HasAnnotation("Relational:Sequence:EliteDemoSchema.shops_seq", "'shops_seq', 'EliteDemoSchema', '1', '10', '', '', 'Int64', 'False'")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WebAPI.Domain.Aggregates.ShopAggregate.ShiftSetting", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:HiLoSequenceName", "ship_settings_seq")
                        .HasAnnotation("SqlServer:HiLoSequenceSchema", "EliteDemoSchema")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.SequenceHiLo);

                    b.Property<DateTime>("CreatedAt");

                    b.Property<int?>("CreatedBy");

                    b.Property<DateTime?>("DeletedAt");

                    b.Property<int>("Quantity");

                    b.Property<string>("Rule")
                        .IsRequired();

                    b.Property<int?>("ShopLocationId");

                    b.Property<DateTime?>("UpdatedAt");

                    b.Property<int?>("UpdatedBy");

                    b.HasKey("Id");

                    b.HasIndex("ShopLocationId");

                    b.ToTable("shift_settings","EliteDemoSchema");
                });

            modelBuilder.Entity("WebAPI.Domain.Aggregates.ShopAggregate.Shop", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:HiLoSequenceName", "shops_seq")
                        .HasAnnotation("SqlServer:HiLoSequenceSchema", "EliteDemoSchema")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.SequenceHiLo);

                    b.Property<DateTime>("CreatedAt");

                    b.Property<int?>("CreatedBy");

                    b.Property<DateTime?>("DeletedAt");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<DateTime?>("UpdatedAt");

                    b.Property<int?>("UpdatedBy");

                    b.HasKey("Id");

                    b.ToTable("shops","EliteDemoSchema");
                });

            modelBuilder.Entity("WebAPI.Domain.Aggregates.ShopAggregate.ShopLocation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:HiLoSequenceName", "shop_locations_seq")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.SequenceHiLo);

                    b.Property<DateTime>("CreatedAt");

                    b.Property<int?>("CreatedBy");

                    b.Property<DateTime?>("DeletedAt");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<int?>("ShopId");

                    b.Property<DateTime?>("UpdatedAt");

                    b.Property<int?>("UpdatedBy");

                    b.HasKey("Id");

                    b.HasIndex("ShopId");

                    b.ToTable("shop_locations","EliteDemoSchema");
                });

            modelBuilder.Entity("WebAPI.Domain.Aggregates.ShopAggregate.ShiftSetting", b =>
                {
                    b.HasOne("WebAPI.Domain.Aggregates.ShopAggregate.ShopLocation")
                        .WithMany("ShiftSettings")
                        .HasForeignKey("ShopLocationId");
                });

            modelBuilder.Entity("WebAPI.Domain.Aggregates.ShopAggregate.ShopLocation", b =>
                {
                    b.HasOne("WebAPI.Domain.Aggregates.ShopAggregate.Shop")
                        .WithMany("ShopLocations")
                        .HasForeignKey("ShopId");
                });
#pragma warning restore 612, 618
        }
    }
}
