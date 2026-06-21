using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using server.Data;       // DbContext שלך
using server.model;      // המחלקות PricesList, PricesListDTO, DeletedPrices
using System.Threading.Tasks;
using System.Collections.Generic;

namespace server.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class PricesListController : ControllerBase
    {
        private readonly MyHotelDbContext _context;

        public PricesListController(MyHotelDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PricesList>>> GetConditions(int skip = 0, int take = 10)
        {
            var Event = await _context.PricesLists
                .ToListAsync();
            return Ok(Event);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePrice([FromBody] PricesListDTO dto)
        {
            // בדיקה אם Event כבר קיים
            var exists = await _context.PricesLists
                                       .AnyAsync(p => p.Event == dto.Event);

            if (exists)
                return BadRequest($"Event '{dto.Event}' כבר קיים במערכת.");

            var price = new PricesList
            {
                Price = dto.Price,
                Event = dto.Event
            };

            _context.PricesLists.Add(price);
            await _context.SaveChangesAsync();

            // מחזיר HTTP 201 Created עם Action שמחזיר את הרשומה החדשה
            // return CreatedAtAction(
            //     nameof(GetPriceById),          // שם הפעולה שמחזירה רשומה לפי Id
            //     new { id = price.IdPrice },    // פרמטרים לאיתור הרשומה
            //     price       

            //            );        // גוף התשובה

            return NoContent();

        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePrice(Guid id, [FromBody] PricesListDTO dto)
        {
            var price = await _context.PricesLists.FindAsync(id);
            if (price == null) return NotFound();

            // בדיקה: אם יש ניסיון לשנות Event ל-Event שכבר קיים ברשומה אחרת
            var exists = await _context.PricesLists
                                       .AnyAsync(p => p.Event == dto.Event && p.IdPrice != id);

            if (exists)
                return BadRequest($"Event '{dto.Event}' כבר קיים ברשומה אחרת.");

            // עדכון שדות קיימים בלבד
            price.Price = dto.Price;
            price.Event = dto.Event;

            await _context.SaveChangesAsync();
            return Ok(price);
        }

        [HttpGet("pricebyevent/{eventName}")]
        public async Task<IActionResult> GetPriceByEvent(string eventName)
        {
            var price = await _context.PricesLists
                                      .Where(p => p.Event == eventName)
                                      .Select(p => p.Price)
                                      .FirstOrDefaultAsync();

            if (price == 0) return NotFound();
            return Ok(price);
        }

        [HttpGet("idbyevent/{eventName}")]
        public async Task<IActionResult> GetIdByEvent(string eventName)
        {
            Console.WriteLine($"Searching for option: '{eventName}'");

            var item = await _context.PricesLists
                                   .Where(p => p.Event == eventName)
                                   .FirstOrDefaultAsync();

            if (item == null) return NotFound();
            return Ok(item.IdPrice);
        }
        [HttpGet("price/{id}")]
        public async Task<IActionResult> GetPriceById(Guid id)
        {
            // מחפש את הרשומה לפי IdPrice
            var price = await _context.PricesLists
                                      .Where(p => p.IdPrice == id)
                                      .FirstOrDefaultAsync();

            // אם הרשומה לא קיימת מחזירים 404
            if (price == null)
                return NotFound();

            // מחזיר את הערך של Price בלבד
            return Ok(price.Price);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePrice(Guid id)
        {
            var price = await _context.PricesLists.FindAsync(id);
            if (price == null) return NotFound();

            // שמירה בהיסטוריה
            var history = new PricesListHistory
            {
                IdPrice = price.IdPrice,
                Price = price.Price,
                Event = price.Event,
                DeletedAt = DateTime.UtcNow
            };
            _context.PricesListHistories.Add(history);

            _context.PricesLists.Remove(price);
            await _context.SaveChangesAsync();

            return Ok($"Deleted Price ID {id} and saved to history.");
        }
    }
}