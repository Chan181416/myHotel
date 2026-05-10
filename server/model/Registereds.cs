
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.model
{
    public class Registereds
    {
        [Key]
        public Guid Id {get; set;}
        public string? NumberId { get; set; }
        public string? name { get; set; }
        [ForeignKey("PricesList")]
        public int Options { get; set; }
        public int sumPlace { get; set; }
        [ForeignKey("Condition")]
        public int conditions { get; set; }
        public int totalPrice { get; set; }
    }
}