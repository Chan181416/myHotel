using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.model;
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
        // הכנסת רשומה
        [HttpPost]
        public async Task<IActionResult> Create(Registereds registered)
        {
            registered.Id = Guid.NewGuid();

            _context.Registereds.Add(registered);
            await _context.SaveChangesAsync();

            return Ok(registered);
        }

        // עדכון חלקי לפי ID
        [HttpPatch("{id}")]
        public async Task<IActionResult> Update(Guid id, Registereds updated)
        {
            var registered = await _context.Registereds
                .FirstOrDefaultAsync(x => x.Id == id);

            if (registered == null)
                return NotFound();

            if (updated.NumberId != null)
                registered.NumberId = updated.NumberId;

            if (updated.Name != null)
                registered.Name = updated.Name;

            if (updated.SumPlace != 0)
                registered.SumPlace = updated.SumPlace;

            if (updated.TotalPrice != 0)
                registered.TotalPrice = updated.TotalPrice;

            await _context.SaveChangesAsync();

            return Ok(registered);
        }

    }
}