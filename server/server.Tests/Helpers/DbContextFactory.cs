using Microsoft.EntityFrameworkCore;
using server.Data;

namespace server.Tests.Helpers
{
    public static class DbContextFactory
    {
        public static MyHotelDbContext Create()
        {
            var options = new DbContextOptionsBuilder<MyHotelDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString()) // 🔥 קריטי
                .EnableSensitiveDataLogging()
                .Options;

            return new MyHotelDbContext(options);
        }
        
    }
}