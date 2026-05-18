using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.model
{
    public class RoomLocation
    {
        [Key]
        public Guid Id { get; set; }
        
        
        public List<RoomDB> ListRoom { get; set; }
        public List<Registereds> ListRegistereds { get; set; }
    }
}
