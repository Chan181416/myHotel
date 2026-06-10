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
        public DbSet<RegisteredsHistory> RegisteredsHistory { get; set; }

        public DbSet<PricesList> PricesLists { get; set; }
        public DbSet<PricesListHistory> PricesListHistories { get; set; }
        public DbSet<RoomsDB> RoomsDBs { get; set; }
        public DbSet<Condition> Conditions { get; set; }
        public DbSet<RoomLocation> RoomLocations { get; set; }
        public DbSet<Role> Roles { get; set; }
        public MyHotelDbContext(DbContextOptions<MyHotelDbContext> options)
                   : base(options)

        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {


            modelBuilder.Entity<Registereds>()
            .HasOne(r => r.Event)
            .WithMany(p => p.Registrations)
            .HasForeignKey(r => r.PriceListId);

            modelBuilder.Entity<Registereds>()
            .HasOne(r => r.Condition)
            .WithMany(c => c.Registrations)
            .HasForeignKey(r => r.ConditionId);

            modelBuilder.Entity<RoomLocation>()
            .HasOne(r => r.Room)
            .WithMany(c => c.RoomLocations)
            .HasForeignKey(r => r.Rooms)
            .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<RoomLocation>()
           .HasOne(r => r.Registereds)
           .WithMany(c => c.Rooms)
           .HasForeignKey(r => r.RegisteredsId)
           .OnDelete(DeleteBehavior.Cascade);

        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=localhost, 1434;Database=Hotel;User Id=SA;Password=1234567!Cb;MultipleActiveResultSets=true;TrustServerCertificate=True;");
        }
    }
}

