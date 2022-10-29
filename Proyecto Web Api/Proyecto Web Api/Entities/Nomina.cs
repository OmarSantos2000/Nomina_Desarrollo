using System.ComponentModel.DataAnnotations;

namespace Proyecto_Web_Api.Entities
{
    public class Nomina
    {
        [Key]
        public int NominaId { get; set; }

        [Required]
        public int? Horas { get; set; }
        [Required]
        public int? ValorHora { get; set; }
        [Required]
        public int? Sueldo { get; set; }

        public ICollection<Empleado> Empleados { get; set; }
        public Nomina()
        {
            Empleados = new HashSet<Empleado>();
        }

    }
}
