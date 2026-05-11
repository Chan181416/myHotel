 using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.model
{
    public class PricesList
    {
       
        public int IdPrice { get; set; }
        public string? Events { get; set; }
        public int Price { get; set; }
    }

    public class PricesListDTO
    {
        public string? Events { get; set; }
        public int Price { get; set; }
    }
}
