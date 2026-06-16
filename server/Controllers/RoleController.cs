using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Model;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly MyHotelDbContext _context;

        public RoleController(MyHotelDbContext context)
        {
            _context = context;
        }

        // ============================================
        // בקשה להכנסת שורה חדשה לטבלת Roles
        // הבקשה בודקת שאין כפילות לפי Name ו-Num
        // ============================================
        [HttpPost("AddRole")]
        public async Task<IActionResult> AddRole(RoleDTO roleDto)
        {
            bool exists = await _context.Roles
                .AnyAsync(r => r.Name == roleDto.Name && r.IdNumber == roleDto.IdNumber);

            if (exists)
            {
                return BadRequest("Role already exists");
            }

            Role role = new Role
            {
                Id = Guid.NewGuid(),
                Name = roleDto.Name,
                IdNumber = roleDto.IdNumber,
                Code = roleDto.Code
            };

            await _context.Roles.AddAsync(role);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // ============================================
        // בקשה לעדכון שדה בודד בלבד בשורה קיימת
        // שולחים Id + שם שדה + ערך חדש
        // שאר הנתונים נשארים ללא שינוי
        // ============================================
        [HttpPatch("UpdateField")]
        public async Task<IActionResult> UpdateField(
            Guid id,
            string fieldName,
            string newValue)
        {
            var role = await _context.Roles.FindAsync(id);

            if (role == null)
            {
                return NotFound("Role not found");
            }

            switch (fieldName.ToLower())
            {
                case "name":
                    role.Name = newValue;
                    break;

                case "idnumber":
                    if (!int.TryParse(newValue, out int num))
                    {
                        return BadRequest("Invalid number");
                    }

                    role.IdNumber = num;
                    break;
                case "Code":
                    if (!int.TryParse(newValue, out int number))
                    {
                        return BadRequest("Invalid number");
                    }

                    role.Code = number;
                    break;
                default:
                    return BadRequest("Invalid field name");
            }

            await _context.SaveChangesAsync();

            return Ok(role);
        }

        // ============================================
        // בקשה לקבלת כל נתוני השורה לפי Id
        // מחזירה את כל השדות של Role
        // ============================================
        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var role = await _context.Roles
                .FirstOrDefaultAsync(r => r.Id == id);

            if (role == null)
            {
                return NotFound("Role not found");
            }

            return Ok(role);
        }

        [HttpGet("getByNameAndId/{name}/{id}")]
        public async Task<IActionResult> getByNameAndId(string name,int id)
        {
            Console.WriteLine($"HIT: {name} {id}");
            var role = await _context.Roles
                .FirstOrDefaultAsync(r => r.Name == name && r.IdNumber==id);
                

            if (role == null)
            {
                return NotFound("Role not found");
            }

            return Ok(role);
        }

    }
}