using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Json;

using server.model;
using server.model.server.Model;


public class myHotelDbContext : DbContext
{
    public DbSet<Registereds> Registereds { get; set; }
    public DbSet<PricesList> PricesLists { get; set;}
    public DbSet<EnumOptions> EnumOptions { get; set; }
    public DbSet<RoomsDB> RoomsDBs { get; set; }
    public DbSet<Condition> Conditions { get; set; }
    public DbSet<ConditionEnum> ConditionEnums { get; set; }
    public DbSet<RoomLocation> RoomLocations { get; set; }
}

