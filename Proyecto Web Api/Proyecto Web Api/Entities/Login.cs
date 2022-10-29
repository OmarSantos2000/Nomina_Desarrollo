using System.ComponentModel.DataAnnotations;

namespace Proyecto_Web_Api.Entities
{
    public class Login
    {
        [Key]

        public int LoginId { get; set; } 

        public string? Usuario { get; set; }

        public string? Clave { get; set; }

    }
}
