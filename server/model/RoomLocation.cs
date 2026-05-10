using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.model
{
    public class RoomLocation
    {
        [Key]
        public Guid Id { get; set; }

        [ForeignKey("RoomsDB")]
        public int RoomNum { get; set; }

        [ForeignKey("Registereds")]
        public int  NumberId { get; set; }
        
    }
}
