using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomLocationController : ControllerBase
    {
        private readonly MyHotelDbContext _context;

        public RoomLocationController(MyHotelDbContext context)
        {
            _context = context;
        }

        // יצירת קשר חדש בין חדר לאורח
        [HttpPost]
        public async Task<IActionResult> Add(RoomLocationDTO dto)
        {
            bool roomExists =
                await _context.RoomsDBs.AnyAsync(r => r.Id == dto.Rooms);

            if (!roomExists)
                return BadRequest("Room does not exist");

            bool registeredExists =
                await _context.Registereds.AnyAsync(r => r.Id == dto.RegisteredsId);

            if (!registeredExists)
                return BadRequest("Registered does not exist");

            var roomLocation = new RoomLocation
            {
                Id = Guid.NewGuid(),
                Rooms = dto.Rooms,
                RegisteredsId = dto.RegisteredsId
            };

            _context.RoomLocations.Add(roomLocation);

            await _context.SaveChangesAsync();

            return Ok(roomLocation);
        }

        // קבלת רשומה לפי Id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var roomLocation = await _context.RoomLocations
                .Include(r => r.Room)
                .Include(r => r.Registereds)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (roomLocation == null)
                return NotFound();

            return Ok(roomLocation);
        }

        // קבלת כל הרשומות
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var list = await _context.RoomLocations
                .Include(r => r.Room)
                .Include(r => r.Registereds)
                .ToListAsync();

            return Ok(list);
        }

        // עדכון החדר או האורח
        [HttpPatch("{id}")]
        public async Task<IActionResult> Update(Guid id, RoomLocationDTO dto)
        {
            var roomLocation =
                await _context.RoomLocations.FindAsync(id);

            if (roomLocation == null)
                return NotFound();

            bool roomExists =
                await _context.RoomsDBs.AnyAsync(r => r.Id == dto.Rooms);

            bool registeredExists =
                await _context.Registereds.AnyAsync(r => r.Id == dto.RegisteredsId);

            if (!roomExists || !registeredExists)
                return BadRequest("Invalid foreign key");

            roomLocation.Rooms = dto.Rooms;
            roomLocation.RegisteredsId = dto.RegisteredsId;

            await _context.SaveChangesAsync();

            return Ok(roomLocation);
        }

        // מחיקה
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var roomLocation =
                await _context.RoomLocations.FindAsync(id);

            if (roomLocation == null)
                return NotFound();

            _context.RoomLocations.Remove(roomLocation);

            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}