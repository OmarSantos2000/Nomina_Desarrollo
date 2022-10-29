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
    [Route("V1/Departamentos")]
    public class DepartamentosController : ControllerBase
    {
        private readonly AppDbContext dbContext;

        public DepartamentosController(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet()]
        public async Task<ActionResult<List<Departamento>>> Get()
        {
            return dbContext.Departamento.ToList();
        }


        [HttpGet("{id}")]
        public ActionResult<Departamento> Get(int id)
        {
            var departamento = dbContext.Departamento.Find(id);

            if (departamento == null)
            {
                return NotFound();
            }
            return Ok(departamento);

        }


        [HttpPost]

        public async Task<ActionResult> Post(Departamento departamento)
        {
            dbContext.Departamento.Add(departamento);

            await dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]

        public async Task<ActionResult> Delete(int id)
        {
            var departamento = await dbContext.Departamento.FindAsync(id);

            if (departamento == null)
            {
                return NotFound();
            }
            dbContext.Remove(departamento);
            await dbContext.SaveChangesAsync();

            return NoContent();
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutCurso(int id, Departamento departamento)
        {
            if (id != departamento.DepartamentoId)
            {
                return BadRequest();
            }

            dbContext.Entry(departamento).State = EntityState.Modified;

            try
            {
                await dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DepartamentoExists(id))
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

        private bool DepartamentoExists(int id)
        {
            throw new NotImplementedException();
        }
    }
}
