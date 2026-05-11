using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.model
{
    namespace server.Model
    {
        public class Condition
        {
            public Guid Id { get; set; }

            public string? Name { get; set; }

            public int price { get; set; }
        }
    }
       
}

