using System;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class BuggyController : BaseApiController
{

    [HttpGet("auth")]
    public IActionResult getAuth()
    {
        return Unauthorized();
    } 

    [HttpGet("not-found")]
    public IActionResult getNotFound()
    {
        return NotFound();
    }

    [HttpGet("server-error")]
    public IActionResult getServerError()
    {
        throw new Exception("This is a Server Error");
    }

    [HttpGet("bad-request")]
    public IActionResult getBadrequest()
    {
        return BadRequest("This was not good request");
    }

}
