using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Proyecto_Web_Api.Context;
using Proyecto_Web_Api.Entities;


namespace Proyecto_Web_Api.Controllers.V1
{

    [ApiController]
    [Route("V1/Empleados")]
    public class EmpleadosController : ControllerBase
    {
        private readonly AppDbContext dbContext;

        public EmpleadosController(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Empleado>>> Get()
        {
            var empleados = dbContext.Empleado
                    .Include(x => x.Cargo)
                    .Include(y => y.Nomina);

            return await empleados.ToListAsync();
        }


        [HttpGet("{id}")]
        public ActionResult<Empleado> Get(int id)
        {
            var empleado = dbContext.Empleado.Find(id);

            if (empleado == null)
            {
                return NotFound();
            }
            return Ok(empleado);

        }


        [HttpPost]

        public async Task<ActionResult> Post(Empleado empleado)
        {
            dbContext.Empleado.Add(empleado);

            await dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]

        public async Task<ActionResult> Delete(int id)
        {
            var empleado = await dbContext.Empleado.FindAsync(id);

            if (empleado == null){
                return NotFound();
            }
            dbContext.Remove(empleado);
            await dbContext.SaveChangesAsync();

            return NoContent();
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutCurso(int id, Empleado empleado)
        {
            if (id != empleado.EmpleadoId)
            {
                return BadRequest();
            }

            dbContext.Entry(empleado).State = EntityState.Modified;

            try
            {
                await dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmpleadoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool EmpleadoExists(int id)
        {
            throw new NotImplementedException();
        }
    }
}
