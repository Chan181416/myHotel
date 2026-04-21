using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Json;


public class myHotelDbContext : DbContext
{
    public DbSet<RegisteredsDB> RegisteredsDBs { get; set; }
    public DbSet<RoomsDB> RoomsDBs { get; set; }
    public DbSet<RegisteredsDB> registeredsDBs { get; set; }
    public DbSet<enumRoom> enumRooms { get; set; }
    public DbSet<enumOptions> enumOptions { get; set; }

}

