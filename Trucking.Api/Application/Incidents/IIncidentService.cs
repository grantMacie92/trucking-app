using api.Application.Common;
using api.Application.Incidents.Add;
using api.Application.Incidents.List;

namespace api.Application.Incidents;

public interface IIncidentService
{
    Task<AddDriverResult> AddDriverAsync(int incidentId, AddIncidentDriverRequest request);

    Task<PagedResult<IncidentListItemDto>> ListByCompanyIdAsync(ListIncidentsQuery query, CancellationToken ct);
    
    Task<PagedResult<IncidentListItemDto>> ListAsync(ListIncidentsQuery query, CancellationToken ct);
}