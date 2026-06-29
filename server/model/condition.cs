using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using server.Models;


namespace server.Models
{
    public class Condition
    {
        [Key]
        public Guid Id { get; set; }
        public string? Option { get; set; }
        public int Price { get; set; }

        public virtual List<Registereds> Registrations { get; set; } = [];
    }
    public class ConditionDTO
    {
        public string? Option { get; set; }
        public int Price { get; set; }
    }


}


