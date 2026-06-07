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
                OnSea = dto.OnSea,
                Extrta = dto.Extrta,
                RoomLocations = new List<RoomLocation>()
            };

            _context.RoomsDBs.Add(room);
            await _context.SaveChangesAsync();

            return NoContent(); // או Ok(room) אם רוצים להחזיר את החדר החדש
        }
        [HttpGet]
        public async Task<IActionResult> GetAllRooms()
        {
            var rooms = await _context.RoomsDBs
                                      .Include(r => r.RoomLocations)
                                      .ToListAsync();

            return Ok(rooms);
        }
        // עדכון שדה Occupied לפי Id
        [HttpPatch("occupied/{id}")]
        public async Task<IActionResult> UpdateOccupied(Guid id, [FromBody] string occupied)
        {
            var room = await _context.RoomsDBs.FindAsync(id);
            if (room == null)
                return NotFound();

            // אם יש לך שדה Occupied חדש ב-RoomsDB או ב-RoomLocation, יש לעדכן בהתאם
            // כאן אני מוסיף שדה זמני
            // room.Occupied = occupied; // אם קיים שדה

            await _context.SaveChangesAsync();

            return Ok(room);
        }

        // שליפת חדר לפי Id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRoomById(Guid id)
        {
            var room = await _context.RoomsDBs
                                     .Include(r => r.RoomLocations) // אם רוצים לשלוף גם RoomLocations
                                     .FirstOrDefaultAsync(r => r.Id == id);
            if (room == null) return NotFound();
            return Ok(room);
        }

        // שליפת שדות ספציפיים לפי RoomNum
        [HttpGet("fields/{roomNum}")]
        public async Task<IActionResult> GetRoomFields(int roomNum)
        {
            var room = await _context.RoomsDBs
                                     .Where(r => r.RoomNum == roomNum)
                                     .Select(r => new
                                     {
                                         r.OnSea,
                                         r.Extrta,
                                         r.RoomLocations // אם רוצים להחזיר את הרשימה
                                     })
                                     .FirstOrDefaultAsync();

            if (room == null) return NotFound();

            return Ok(room);
        }
    }
}