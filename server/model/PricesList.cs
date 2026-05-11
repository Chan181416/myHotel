 using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.model
{
    public class PricesList
    {
        [ForeignKey("EnumOptions")]
        public int IdPrice { get; set; }
        public string? Price { get; set; }
    }
}
