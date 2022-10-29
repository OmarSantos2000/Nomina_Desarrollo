using Microsoft.EntityFrameworkCore.Query.Internal;
using System.ComponentModel.DataAnnotations;

namespace Proyecto_Web_Api.Entities
{
    public class Cargo
    {
        [Key]
        public int CargoId { get; set; }

        [StringLength(50)]
        [Required]
        public string? Nombre_cargo { get; set; }

        public int DepartamentoId   { get; set; }

        public Departamento? Departamento { get; set; }
        public ICollection<Empleado> Empleados { get; set; }

        public Cargo()
        {
            Empleados = new HashSet<Empleado>();
        } 
    }
}
