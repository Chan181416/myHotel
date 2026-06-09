using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.model;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System;

namespace server.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class RoomDBController : ControllerBase
    {
        private readonly MyHotelDbContext _context;

        public RoomDBController(MyHotelDbContext context)
        {
            _context = context;
        }

        // יצירת חדר חדש
        [HttpPost]
        public async Task<IActionResult> CreateRoom([FromBody] RoomsDBDTO dto)
        {
            bool exists = await _context.RoomsDBs
                                        .AnyAsync(r => r.RoomNum == dto.RoomNum);

            if (exists)
                return BadRequest($"Room number '{dto.RoomNum}' כבר קיים במערכת.");

            var room = new RoomsDB
            {
                Id = Guid.NewGuid(),
                RoomNum = dto.RoomNum,
                Floor = dto.Floor,
                ConditionId = dto.ConditionId,
                Sumbed = dto.Sumbed,
                RoomLocations = new List<RoomLocation>()
            };

            _context.RoomsDBs.Add(room);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // שליפת כל החדרים
        [HttpGet]
        public async Task<IActionResult> GetAllRooms()
        {
            var rooms = await _context.RoomsDBs
                                      .Include(r => r.RoomLocations)
                                      .Include(r => r.Condition)
                                      .ToListAsync();

            return Ok(rooms);
        }

        // עדכון (נשאר כמו שהיה - לא נוגע כי אין שדות ישנים)
        [HttpPatch("occupied/{id}")]
        public async Task<IActionResult> UpdateOccupied(Guid id, [FromBody] string occupied)
        {
            var room = await _context.RoomsDBs.FindAsync(id);
            if (room == null)
                return NotFound();

            await _context.SaveChangesAsync();

            return Ok(room);
        }

        // שליפת חדר לפי Id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRoomById(Guid id)
        {
            var room = await _context.RoomsDBs
                                     .Include(r => r.RoomLocations)
                                     .Include(r => r.Condition)
                                     .FirstOrDefaultAsync(r => r.Id == id);

            if (room == null) return NotFound();

            return Ok(room);
        }

        // שליפת שדות לפי RoomNum
        [HttpGet("fields/{roomNum}")]
        public async Task<IActionResult> GetRoomFields(int roomNum)
        {
            var room = await _context.RoomsDBs
                                     .Where(r => r.RoomNum == roomNum)
                                     .Select(r => new
                                     {
                                         r.RoomNum,
                                         r.Floor,
                                         r.ConditionId,
                                         ConditionOption = r.Condition.Option,
                                         r.RoomLocations
                                     })
                                     .FirstOrDefaultAsync();

            if (room == null)
                return NotFound();

            return Ok(room);
        }
    }
}

