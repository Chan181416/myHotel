using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.model
{
    public class PricesList
    {
        [Key]
        public int IdPrice { get; set; }
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
        public int IdHistory { get; set; }
        public int IdPrice { get; set; }
        public int Price { get; set; }
        public string? Event { get; set; }
        public DateTime DeletedAt { get; set; }
    }
}
