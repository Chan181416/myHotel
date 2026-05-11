using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Json;
using server.ConditionEnum.server.Model;
using server.model;


public class myHotelDbContext : DbContext
{
    public DbSet<Registereds> Registereds { get; set; }
    public DbSet<PricesList> pricesLists { get; set;}
    public DbSet<RoomsDB> RoomsDBs { get; set; }
    public DbSet<Registereds> registeredsDBs { get; set; }
    public DbSet<Condition> conditions { get; set; }
    public DbSet<EnumOptions> enumOptions { get; set; }

}

