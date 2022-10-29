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
    [Route("V1/Logins")]
    public class LoginsController : ControllerBase
    {
        private readonly AppDbContext dbContext;

        public LoginsController(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost()]
        public ActionResult Get(Login login)
        {
            var recurso = dbContext.Login.SingleOrDefault(x => x.Usuario == login.Usuario && x.Clave == login.Clave);

            if (recurso != null)
            {
                return Ok(recurso);
            }
            else
            {
                return NotFound();
            }
        }

        
        [HttpPost()]
        [Route("V1/Logins/add")]
        public async Task<ActionResult> Post(Login login)
        {
            dbContext.Login.Add(login);

            await dbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}