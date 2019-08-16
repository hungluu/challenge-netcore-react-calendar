﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI.Infrastructure.Migrations
{
    public partial class InitShop : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "EliteDemoSchema");

            migrationBuilder.CreateSequence(
                name: "shop_locations_seq",
                incrementBy: 10);

            migrationBuilder.CreateSequence(
                name: "ship_settings_seq",
                schema: "EliteDemoSchema",
                incrementBy: 10);

            migrationBuilder.CreateSequence(
                name: "shops_seq",
                schema: "EliteDemoSchema",
                incrementBy: 10);

            migrationBuilder.CreateTable(
                name: "shops",
                schema: "EliteDemoSchema",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: true),
                    DeletedAt = table.Column<DateTime>(nullable: true),
                    CreatedBy = table.Column<int>(nullable: true),
                    UpdatedBy = table.Column<int>(nullable: true),
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_shops", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "shop_locations",
                schema: "EliteDemoSchema",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: true),
                    DeletedAt = table.Column<DateTime>(nullable: true),
                    CreatedBy = table.Column<int>(nullable: true),
                    UpdatedBy = table.Column<int>(nullable: true),
                    Name = table.Column<string>(nullable: false),
                    ShopId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_shop_locations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_shop_locations_shops_ShopId",
                        column: x => x.ShopId,
                        principalSchema: "EliteDemoSchema",
                        principalTable: "shops",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "shift_settings",
                schema: "EliteDemoSchema",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    UpdatedAt = table.Column<DateTime>(nullable: true),
                    DeletedAt = table.Column<DateTime>(nullable: true),
                    CreatedBy = table.Column<int>(nullable: true),
                    UpdatedBy = table.Column<int>(nullable: true),
                    Quantity = table.Column<int>(nullable: false),
                    Rule = table.Column<string>(nullable: false),
                    ShopLocationId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_shift_settings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_shift_settings_shop_locations_ShopLocationId",
                        column: x => x.ShopLocationId,
                        principalSchema: "EliteDemoSchema",
                        principalTable: "shop_locations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_shift_settings_ShopLocationId",
                schema: "EliteDemoSchema",
                table: "shift_settings",
                column: "ShopLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_shop_locations_ShopId",
                schema: "EliteDemoSchema",
                table: "shop_locations",
                column: "ShopId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "shift_settings",
                schema: "EliteDemoSchema");

            migrationBuilder.DropTable(
                name: "shop_locations",
                schema: "EliteDemoSchema");

            migrationBuilder.DropTable(
                name: "shops",
                schema: "EliteDemoSchema");

            migrationBuilder.DropSequence(
                name: "shop_locations_seq");

            migrationBuilder.DropSequence(
                name: "ship_settings_seq",
                schema: "EliteDemoSchema");

            migrationBuilder.DropSequence(
                name: "shops_seq",
                schema: "EliteDemoSchema");
        }
    }
}
