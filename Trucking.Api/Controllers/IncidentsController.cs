using api.Application.Incidents;
using api.Application.Incidents.Add;
using api.Application.Incidents.List;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[Route("api/incidents")]
public class IncidentsController : ControllerBase
{
    private readonly IIncidentService _service;

    public IncidentsController(IIncidentService service)
    {
        _service = service;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetIncidents([FromQuery] ListIncidentsQuery query, CancellationToken ct)
    {
        var result = await _service.ListAsync(query, ct);

        return Ok(result);
    }

    [HttpPost("{incidentId:int}/drivers")]
    public async Task<IActionResult> AddDriver(int incidentId, AddIncidentDriverRequest req)
    {
        var result = await _service.AddDriverAsync(incidentId, req);
        return result switch
        {
            AddDriverResult.NotFound => NotFound(),
            AddDriverResult.InvalidCompany => BadRequest("Driver and incident must belong to same company."),
            AddDriverResult.Ok => NoContent(),
            _ => StatusCode(500)
        };
    }
}