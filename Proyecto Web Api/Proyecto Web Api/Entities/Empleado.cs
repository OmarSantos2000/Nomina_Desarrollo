using Microsoft.EntityFrameworkCore.Query.Internal;
using System.ComponentModel.DataAnnotations;

namespace Proyecto_Web_Api.Entities
{
    public class Empleado
    {
        [Key]
        public int EmpleadoId { get; set; }

        [StringLength(50)]
        public string? Nombres { get; set; }

        [StringLength(50)]
        public string? Apellidos { get; set; }

        public int? Telefono { get; set; }


        [StringLength(50)]
        public string? Direccion { get; set; }

        public int CargoId { get; set; }

        public Cargo? Cargo { get; set; }
        public int NominaId { get; set; }
        public Nomina? Nomina { get; set; }
    }
}
