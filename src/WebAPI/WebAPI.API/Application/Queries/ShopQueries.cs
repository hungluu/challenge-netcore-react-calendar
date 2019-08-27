using System.Data.SqlClient;
using System.Threading.Tasks;
using System;
using Dapper;
using System.Collections.Generic;

namespace WebAPI.API.Application.Queries
{
    public class ShopQueries : IShopQueries
    {
        private string _connectionString;

        public ShopQueries(string constr)
        {
            _connectionString = !string.IsNullOrWhiteSpace(constr)
                ? constr
                : throw new ArgumentNullException(nameof(constr));
        }

        public async Task<List<ShopLocationViewModel>> GetShopLocationsFromShopAsync(int shopId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                var results = await connection.QueryAsync<ShopLocationViewModel>(
                    @"SELECT l.[Id] as Id, l.[Name] as Name
                        FROM [EliteDemoSchema].[shop_locations] l
                        WHERE l.ShopId = @shopId",
                    new { shopId }
                );

                return results.AsList();
            }
        }

        public async Task<List<ShopViewModel>> GetShopsAsync()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                var results = await connection.QueryAsync<ShopViewModel>(
                    @"SELECT s.[Id] as Id, s.[Name] as Name
                        FROM [EliteDemoSchema].[shops] s"
                );

                return results.AsList();
            }
        }

        public async Task<List<ShiftSettingViewModel>> GetShopShiftSettingsAsync(int shopId, int? locationId = null)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                var query = @"SELECT
                            st.[Id] as Id,
                            st.[Quantity] as Quantity,
                            st.[Rule] as [Rule],
                            st.[LocationId] as LocationId
                        FROM [EliteDemoSchema].[shift_settings] st
                        WHERE st.[ShopId] = @shopId";

                if (locationId != null)
                {
                    query += " AND st.[LocationId] = @locationId ";
                }

                var results = await connection.QueryAsync<ShiftSettingViewModel>(
                    query,
                    new { shopId, locationId }
                );

                return results.AsList();
            }
        }
    }
}
