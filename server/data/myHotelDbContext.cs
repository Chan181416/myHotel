using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Json;


public class myHotelDbContext : DbContext
{
    public DbSet<optionsDB> optionsDBs { get; set; }
    public DbSet<RegisteredsDB> RegisteredsDBs { get; set; }
    public DbSet<RoomsDB> RoomsDBs { get; set; }

}

