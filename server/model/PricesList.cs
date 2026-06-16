 using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.model
{
    public class PricesList
    {
        [ForeignKey(EnumPrice)]
        public Guid Id { get; set; }
        public int Price { get; set; }
        
    }
}
