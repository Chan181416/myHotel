using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Model;
using server.Data;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CheckTablesController : ControllerBase
    {
        private readonly MyHotelDbContext _context;

        public CheckTablesController(MyHotelDbContext context)
        {
            _context = context;
        }

        [HttpGet("allTablesHaveData")]
        public async Task<IActionResult> AllTablesHaveData()
        {
            // בדיקה אם בכל הטבלאות יש לפחות רשומה אחת
            bool allTablesHaveData =
                await _context.Conditions.AnyAsync() &&
                await _context.PricesLists.AnyAsync() &&
                await _context.RoomsDBs.AnyAsync() &&
                await _context.Roles.AnyAsync();

            return Ok(allTablesHaveData); // מחזיר true או false
        }
    }
}