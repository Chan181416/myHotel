using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System;

namespace server.Controllers
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
            var hasLocation = rooms.Where(r => r.RoomLocations.Count > 0);
            var map = rooms.Select(r => new RoomsDBDTOs
            {
                Id = r.Id,
                ConditionId = r.ConditionId,
                Floor = r.Floor,
                RoomNum = r.RoomNum,
                Sumbed = r.Sumbed,
                RoomLocations = r.RoomLocations.Select(rl => rl.Id).ToList()
            });


            return Ok(map);
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

        [HttpGet("full/{id}")]
        public async Task<IActionResult> GetRoomFillById(Guid id)
        {
            var locations = _context.RoomLocations.Where(r => r.Room != null && r.Room.Id == id);



            if (locations == null) return NotFound();

            return Ok(locations);



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
        // [HttpPut("add-room-location")]
        // public async Task<IActionResult> AddRoomLocation(AddRoomLocationDTO dto)
        // {
        //     var room = await _context.RoomsDBs
        //         .Include(r => r.RoomLocations)
        //         .FirstOrDefaultAsync(r => r.Id == dto.RoomId);

        //     if (room == null)
        //         return NotFound("Room not found");

        //     var roomLocation = await _context.RoomLocations
        //         .FirstOrDefaultAsync(r => r.Id == dto.RoomLocationId);

        //     if (roomLocation == null)
        //         return NotFound("RoomLocation not found");

        //     room.RoomLocations.Add(roomLocation);

        //     await _context.SaveChangesAsync();

        //     return Ok();
        // }
        [HttpGet("allRoomsFull")]
        public async Task<bool> AllRoomsFull()
        {
            var rooms = await _context.RoomsDBs
                .Include(r => r.RoomLocations)
                .ToListAsync();

            foreach (var room in rooms)
            {
                if (room.RoomLocations.Count > 1)
                    continue;

                if (room.RoomLocations.Count == 1)
                {
                    var roomLocation = room.RoomLocations.First();

                    var eventData = await _context.PricesLists
                        .FirstOrDefaultAsync(e => e.IdPrice == roomLocation.Id);

                    if (eventData != null && eventData.Event == "נופש_מלא")
                        continue;
                }

                return false;
            }

            return true;
        }
    }
}