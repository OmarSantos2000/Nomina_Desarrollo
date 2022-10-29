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
    [Route("V1/Cargos")]
    public class CargosController : ControllerBase
    {
        private readonly AppDbContext dbContext;

        public CargosController(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet()]
        public async Task<ActionResult<List<Cargo>>> Get()
        {
            return dbContext.Cargo.ToList();
        }


        [HttpGet("{id}")]
        public ActionResult<Cargo> Get(int id)
        {
            var cargo = dbContext.Cargo.Find(id);

            if (cargo == null)
            {
                return NotFound();
            }
            return Ok(cargo);

        }

        [HttpPost]

        public async Task<ActionResult> Post(Cargo cargo)
        {
            dbContext.Cargo.Add(cargo);

            await dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]

        public async Task<ActionResult> Delete(int id)
        {
            var cargo = await dbContext.Cargo.FindAsync(id);

            if (cargo == null)
            {
                return NotFound();
            }
            dbContext.Remove(cargo);
            await dbContext.SaveChangesAsync();

            return NoContent();
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutCurso(int id, Cargo cargo)
        {
            if (id != cargo.CargoId)
            {
                return BadRequest();
            }

            dbContext.Entry(cargo).State = EntityState.Modified;

            try
            {
                await dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CargoExists(id))
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

        private bool CargoExists(int id)
        {
            throw new NotImplementedException();
        }
    }
}
