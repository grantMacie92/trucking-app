using api.Application.Companies;
using api.Application.Companies.List;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[Route("api/company")]
public class CompaniesController : ControllerBase
{
    private readonly ICompanyService _service;

    public CompaniesController(ICompanyService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetCompanies([FromQuery] ListCompaniesQuery query, CancellationToken ct)
    {
        var result = await _service.ListAsync(query, ct);

        return Ok(result);
    }
}