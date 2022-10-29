using System.ComponentModel.DataAnnotations;

namespace Proyecto_Web_Api.Entities
{
    public class Departamento
    {
        [Key]
        public int DepartamentoId { get; set; }

        [StringLength(50)]
        [Required]
        public string? Nombre_Depto { get; set; }

        public ICollection<Cargo> Cargos { get; set; }

        public Departamento()
        {
            Cargos = new HashSet<Cargo>();
        }
    }
}
