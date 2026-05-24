using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.model
{
    public class Employees
    {
        public string? Name { get; set; }
        public int NumberId { get; set; }
        
        public List<EnumRoles> ListEnumRoles { get; set; }
    }

    public class EmployeesDTO
    {
        public string? Name { get; set; }
        public int NumberId { get; set; }
        public List<EnumRoles> ListEnumRoles { get; set; }
    }
}
