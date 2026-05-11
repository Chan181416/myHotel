using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.model
{
    public class RoomLocation
    {
        [Key]
        public Guid Id { get; set; }
        virtual public List<RoomsDB> ListRooms {get;set;} = [];
        virtual public List<Registereds> ListRegistereds {get;set;} = [];

    }
}
