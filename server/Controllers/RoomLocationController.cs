using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.model;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomLocationController : ControllerBase
    {
        private readonly MyHotelDbContext _context;

        public RoomLocationController(MyHotelDbContext context)
        {
            _context = context;
        }

        // =====================================================
        // בקשה להוספת RoomLocation חדש עם כל השדות
        // =====================================================
        [HttpPost("AddRoomLocation")]
        public async Task<IActionResult> AddRoomLocation(RoomLocationDTO dto)
        {
            RoomLocation roomLocation = new RoomLocation
            {
                Id = Guid.NewGuid(),
                ListRooms = dto.ListRooms,
                ListRegistereds = dto.ListRegistereds
            };

            await _context.RoomLocations.AddAsync(roomLocation);
            await _context.SaveChangesAsync();

            return Ok(roomLocation);
        }

        // =====================================================
        // בקשה לעדכון חלק מהשדות בלבד לפי Id
        // רק שדות שנשלחים יתעדכנו
        // =====================================================
        [HttpPatch("UpdateRoomLocation/{id}")]
        public async Task<IActionResult> UpdateRoomLocation(
            Guid id,
            RoomLocationDTO dto)
        {
            var roomLocation = await _context.RoomLocations
                .Include(r => r.ListRooms)
                .Include(r => r.ListRegistereds)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (roomLocation == null)
            {
                return NotFound("RoomLocation not found");
            }

            if (dto.ListRooms != null && dto.ListRooms.Count > 0)
            {
                roomLocation.ListRooms = dto.ListRooms;
            }

            if (dto.ListRegistereds != null && dto.ListRegistereds.Count > 0)
            {
                roomLocation.ListRegistereds = dto.ListRegistereds;
            }

            await _context.SaveChangesAsync();

            return Ok(roomLocation);
        }

        // =====================================================
        // בקשה לקבלת כל השדות לפי Id
        // =====================================================
        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var roomLocation = await _context.RoomLocations
                .Include(r => r.ListRooms)
                .Include(r => r.ListRegistereds)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (roomLocation == null)
            {
                return NotFound("RoomLocation not found");
            }

            return Ok(roomLocation);
        }
        // =====================================================
        // בקשה שמחזירה מתוך ListRegistereds
        // רק NumberId ו-Name
        // לפי NumberId שנשלח
        // =====================================================
        [HttpGet("GetRegisteredByNumberId/{numberId}")]
        public async Task<IActionResult> GetRegisteredByNumberId(string numberId)
        {
            var result = await _context.RoomLocations
                .SelectMany(r => r.ListRegistereds)
                .Where(x => x.NumberId == numberId)
                .Select(x => new
                {
                    x.NumberId,
                    x.Name
                })
                .FirstOrDefaultAsync();

            if (result == null)
            {
                return NotFound("Registered not found");
            }

            return Ok(result);
        }
        // =====================================================
        // בקשה שמחזירה מתוך RoomDB רק RoomNum ו-Floor
        // לפי RoomLocation Id
        // =====================================================

        [HttpGet("GetRoomsSmall/{id}")]
        public async Task<IActionResult> GetRoomsSmall(Guid id)
        {
            var result = await _context.RoomLocations
                .Where(r => r.Id == id)
                .Select(r => new
                {
                    ListRooms = r.ListRooms.Select(room => new
                    {
                        room.RoomNum,
                        room.Floor
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            if (result == null)
            {
                return NotFound("RoomLocation not found");
            }

            return Ok(result);
        }
        //=====================================================================
        // בקשת שרת שמכניסה את כל הנתונים לאחר שאילתות נכונות לDatabase
        //=====================================================================
        [HttpPost("AttachToRoomLocation")]
        public async Task<IActionResult> AttachToRoomLocation(Guid roomLocationId, string numberId)
        {
            var roomLocation = await _context.RoomLocations
                .Include(r => r.ListRooms)
                .Include(r => r.ListRegistereds)
                .FirstOrDefaultAsync(r => r.Id == roomLocationId);

            if (roomLocation == null)
                return NotFound("RoomLocation not found");

            var registered = await _context.Registereds
                .FirstOrDefaultAsync(r => r.NumberId == numberId);

            if (registered == null)
                return NotFound("Registered not found");

            // אם כבר קיים לא מוסיפים שוב
            if (!roomLocation.ListRegistereds.Any(x => x.NumberId == numberId))
            {
                roomLocation.ListRegistereds.Add(registered);
            }

            await _context.SaveChangesAsync();

            return Ok(roomLocation);
        }
    }
}