using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Json;

using server.model;
using server.Model;

namespace server.Data
{
    public class MyHotelDbContext : DbContext
    {
        public DbSet<Registereds> Registereds { get; set; }
        public DbSet<PricesList> PricesLists { get; set; }
        public DbSet<PricesListHistory> PricesListHistories { get; set; }
        public DbSet<RoomDB> RoomsDBs { get; set; }
        public DbSet<Condition> Conditions { get; set; }
        public DbSet<RoomLocation> RoomLocations { get; set; }
        public DbSet<Role> Roles { get; set; }
        public MyHotelDbContext(DbContextOptions<MyHotelDbContext> options)
                   : base(options)

        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=localhost, 1434;Database=Hotel;User Id=SA;Password=1234567,Cb;MultipleActiveResultSets=true;TrustServerCertificate=True;");
        }
    }
}

