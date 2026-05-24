using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.controllers;
using server.model;

namespace server.controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class PricesListController : ControllerBase
    {
        private readonly myHotelDbContext _context;

        public PricesListController(myHotelDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PricesList>>> GetPrice(int skip = 0, int take = 10)
        {
            return await _context.PricesLists.Skip(skip).Take(take).ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<PricesList>> CreatePriceList(PricesListDTO priceList)
        {
            if(priceList.Price < 0 || priceList.Price == null)
            {
                return BadRequest("The price event is required.");
            }
            if (string.IsNullOrWhiteSpace(priceList.Events))
            {
                return BadRequest("The event title is required.");
            }
            var newPrice = new PricesList
            {
                IdPrice = Guid.NewGuid(),
                Events = priceList.Events,
                Price = priceList.Price,
            };
            _context.PricesLists.Add(newPrice);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPrice), new {id = newPrice.IdPrice}, newPrice);
        }
    }
}