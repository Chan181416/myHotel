using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;
using server.Data;

namespace server.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class RegisteredsController : ControllerBase
    {
        private readonly MyHotelDbContext _context;

        public RegisteredsController(MyHotelDbContext context)
        {
            _context = context;
        }
        [HttpPost]
        public async Task<IActionResult> Add(RegisteredsCreateDTO dto)
        {
            bool eventExists =
                await _context.PricesLists
                    .AnyAsync(x => x.IdPrice == dto.Event);

            if (!eventExists)
                return BadRequest("Event not found");

            bool conditionExists =
                await _context.Conditions
                    .AnyAsync(x => x.Id == dto.Condition);

            if (!conditionExists)
                return BadRequest("Condition not found");

            Registereds registered = new()
            {
                Id = Guid.NewGuid(),
                NumberId = dto.NumberId,
                Name = dto.Name,
                SumPlace = dto.SumPlace,
                TotalPrice = dto.TotalPrice,
                PriceListId = dto.Event,
                ConditionId = dto.Condition
            };

            _context.Registereds.Add(registered);

            await _context.SaveChangesAsync();

            return Ok(registered);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var registered =
                await _context.Registereds
                    .Include(x => x.Event)
                    .Include(x => x.Condition)
                    .Include(x => x.Rooms)
                    .FirstOrDefaultAsync(x => x.Id == id);

            if (registered == null)
                return NotFound();

            return Ok(registered);
        }
        [HttpPatch("UpdateField")]
        public async Task<IActionResult> UpdateField(
            Guid id,
            string fieldName,
            string newValue)
        {
            var registered =
                await _context.Registereds.FindAsync(id);

            if (registered == null)
                return NotFound();

            switch (fieldName.ToLower())
            {
                case "name":
                    registered.Name = newValue;
                    break;

                case "numberid":
                    registered.NumberId = newValue;
                    break;

                case "sumplace":
                    if (!int.TryParse(newValue, out int sumPlace))
                        return BadRequest();

                    registered.SumPlace = sumPlace;
                    break;

                case "totalprice":
                    if (!int.TryParse(newValue, out int totalPrice))
                        return BadRequest();

                    registered.TotalPrice = totalPrice;
                    break;

                case "event":
                    if (!Guid.TryParse(newValue, out Guid eventId))
                        return BadRequest();

                    bool eventExists =
                        await _context.PricesLists
                            .AnyAsync(x => x.IdPrice == eventId);

                    if (!eventExists)
                        return BadRequest("Event not found");

                    registered.PriceListId = eventId;
                    break;

                case "condition":
                    if (!Guid.TryParse(newValue, out Guid conditionId))
                        return BadRequest();

                    bool conditionExists =
                        await _context.Conditions
                            .AnyAsync(x => x.Id == conditionId);

                    if (!conditionExists)
                        return BadRequest("Condition not found");

                    registered.ConditionId = conditionId;
                    break;

                default:
                    return BadRequest("Invalid field");
            }

            await _context.SaveChangesAsync();

            return Ok(registered);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var registered =
                await _context.Registereds
                    .FirstOrDefaultAsync(x => x.Id == id);

            if (registered == null)
                return NotFound();

            RegisteredsHistory history = new()
            {
                Id = Guid.NewGuid(),
                OriginalRegisteredId = registered.Id,

                NumberId = registered.NumberId,
                Name = registered.Name,
                SumPlace = registered.SumPlace,
                TotalPrice = registered.TotalPrice,

                PriceListId = registered.PriceListId,
                ConditionId = registered.ConditionId,

                DeletedAt = DateTime.UtcNow
            };

            _context.RegisteredsHistory.Add(history);

            _context.Registereds.Remove(registered);

            await _context.SaveChangesAsync();

            return Ok();
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Registereds>>> GetAllRegistereds()
        {
            var registereds = await _context.Registereds
                .Include(r => r.Event)        // כולל את האירוע (PriceList)
                .Include(r => r.Condition)    // כולל את ה-Condition
                .Include(r => r.Rooms)        // כולל את הרשימה של החדרים
                .ToListAsync();

            return Ok(registereds);
        }
    }
}