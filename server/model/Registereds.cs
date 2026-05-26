
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using server.Model;

namespace server.model
{
    public class Registereds
    {
        [Key]
        public Guid Id { get; set; }
        public string? NumberId { get; set; }
        public string? Name { get; set; }
        public int SumPlace { get; set; }
        public int TotalPrice { get; set; }

        virtual public List<PricesList> ListOptions { get; set; } = [];
        virtual public List<Condition> ListConditions { get; set; } = [];
    }

    public class RegisteredsCreateDTO
    {
        public string? NumberId { get; set; }
        public string? Name { get; set; }
        public int SumPlace { get; set; }
        public int TotalPrice { get; set; }

        public string? Event { get; set; }
        public string? Condition { get; set; }
    }
}