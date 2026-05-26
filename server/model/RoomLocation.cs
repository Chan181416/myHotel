using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.model
{
    public class RoomLocation
    {
        [Key]
        public Guid Id { get; set; }
        virtual public List<RoomDB> ListRooms {get;set;} = [];
        virtual public List<Registereds> ListRegistereds {get;set;} = [];

    }
     public class RoomLocationDTO
    {
       
       
        virtual public List<RoomDB> ListRooms {get;set;} = [];
        virtual public List<Registereds> ListRegistereds {get;set;} = [];

    }
}
