using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.model
{
    public class PricesList
    {
        [Key]
        public Guid IdPrice { get; set; }
        public int Price { get; set; }
        public string? Event { get; set; }
    }
    public class PricesListDTO
    {
       
        public int Price { get; set; }
        public string? Event { get; set; }
    }
     public class PricesListHistory
    {
        [Key]
        public Guid IdHistory { get; set; }
        public Guid IdPrice { get; set; }
        public int Price { get; set; }
        public string? Event { get; set; }
        public DateTime DeletedAt { get; set; }
    }
}
