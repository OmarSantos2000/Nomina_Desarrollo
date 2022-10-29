using Microsoft.EntityFrameworkCore;
using Proyecto_Web_Api.Entities;
using System.Collections.Generic;

namespace Proyecto_Web_Api.Context

{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Empleado> Empleado { get; set; }

        public DbSet<Departamento> Departamento { get; set; }

        public DbSet<Cargo> Cargo { get; set; }

        public DbSet<Nomina> Nomina { get; set; }
         
        public DbSet<Login>  Login {get; set; }
    }
}
