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
    [Route("V1/Nominas")]
    public class NominasController : ControllerBase
    {
        private readonly AppDbContext dbContext;

        public NominasController(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Nomina>>> Get()
        {
            var empleados = dbContext.Nomina
                    .Include(x => x.Empleados);

            return await empleados.ToListAsync();
        }


        [HttpGet("{id}")]
        public ActionResult<Nomina> Get(int id)
        {
            var nomina = dbContext.Nomina.Find(id);

            if (nomina == null)
            {
                return NotFound();
            }
            return Ok(nomina);

        }


            [HttpPost]

        public async Task<ActionResult> Post(Nomina nomina)
        {
            dbContext.Nomina.Add(nomina);

            await dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]

        public async Task<ActionResult> Delete(int id)
        {
            var nomina = await dbContext.Nomina.FindAsync(id);

            if (nomina == null)
            {
                return NotFound();
            }
            dbContext.Remove(nomina);
            await dbContext.SaveChangesAsync();

            return NoContent();
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutCurso(int id, Nomina nomina)
        {
            if (id != nomina.NominaId)
            {
                return BadRequest();
            }

            dbContext.Entry(nomina).State = EntityState.Modified;

            try
            {
                await dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NominaExists(id))
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

        private bool NominaExists(int id)
        {
            throw new NotImplementedException();
        }
    }
}
