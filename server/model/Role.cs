using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace server.Model
{
    public class Role
    {
        public Guid Id { get; set; }

        public int Name { get; set; }

       
    }
     public class RoleDTO
    {
                public int Name { get; set; }
    }
}
