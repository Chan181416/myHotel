using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Json;
using server.model;


public class myHotelDbContext : DbContext
{
    public DbSet<Registereds> Registereds { get; set; }
    public DbSet<PricesList> pricesLists { get; set;}
    public DbSet<RoomsDB> RoomsDBs { get; set; }
    public DbSet<RegisteredsDB> registeredsDBs { get; set; }
    public DbSet<condition> conditions { get; set; }
    public DbSet<enumOptions> enumOptions { get; set; }

}

