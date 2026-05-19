
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.model;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace server.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class RoomsController : ControllerBase
    {
        private readonly MyHotelDbContext _context;

        public RoomsController(MyHotelDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateRoom([FromBody] RoomsDBDTO dto)
        {
            // בדיקה אם החדר כבר קיים לפי RoomNum
            // var exists = await _context.RoomsDBs
            //                            .AnyAsync(r => r.RoomNum == dto.RoomNum);

            // if (exists)
            //     return BadRequest($"Room number {dto.RoomNum} כבר קיים במערכת.");

            var room = new RoomsDB
            {
                RoomNum = dto.RoomNum,
                Floor = dto.Floor,
                OnSea = dto.OnSea,
                Extrta = dto.Extrta,
                Occupied = dto.Occupied
            };

            _context.RoomsDBs.Add(room);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetRoomById),
                new { id = room.RoomNum },
                room
            );
        }

        [HttpPatch("occupied/{roomNum}")]
        public async Task<IActionResult> UpdateOccupied(int roomNum, [FromBody] string occupied)
        {
            // מציאת החדר לפי RoomNum
            var room = await _context.RoomsDBs.FindAsync(roomNum);
            if (room == null)
                return NotFound();

            // עדכון השדה היחיד
            room.Occupied = occupied;

            // שמירה למסד הנתונים
            await _context.SaveChangesAsync();

            // החזרת החדר המעודכן
            return Ok(room);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRoomById(int id)
        {
            var room = await _context.RoomsDBs.FindAsync(id);
            if (room == null) return NotFound();
            return Ok(room);
        }

        [HttpGet("fields/{roomNum}")]
        public async Task<IActionResult> GetRoomFields(int roomNum)
        {
            var room = await _context.RoomsDBs
                                     .Where(r => r.RoomNum == roomNum)
                                     .Select(r => new
                                     {
                                         r.OnSea,
                                         r.Extrta,
                                         r.Occupied
                                     })
                                     .FirstOrDefaultAsync();

            if (room == null) return NotFound();

            return Ok(room);
        }
    }
}