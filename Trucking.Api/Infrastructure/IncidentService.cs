using api.Application.Common;
using api.Application.Incidents;
using api.Application.Incidents.Add;
using api.Application.Incidents.List;
using api.Data;
using api.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace api.Infrastructure;

public class IncidentService : IIncidentService
{
    private readonly AppDbContext _db;
    
    public IncidentService(AppDbContext db) {
        _db = db;
    }

    public async Task<AddDriverResult> AddDriverAsync(int incidentId, AddIncidentDriverRequest req)
    {
        var incident = await _db.Incidents.FindAsync(incidentId);

        if (incident == null)
        {
            return AddDriverResult.NotFound;
        }

        var driver = await _db.Drivers.FindAsync(req.DriverId);

        if (driver == null)
        {
            return AddDriverResult.NotFound;
        }

        if (driver.CompanyId != incident.CompanyId)
        {
            return AddDriverResult.InvalidCompany;
        }

        var link = new IncidentDriver
        {
            IncidentId = incidentId,
            DriverId = req.DriverId,
            IsAtFault = req.IsAtFault,
            Injured = req.Injured,
            Notes = req.Notes
        };

        _db.IncidentDrivers.Add(link);
        await _db.SaveChangesAsync();

        return AddDriverResult.Ok;
    }

    public async Task<PagedResult<IncidentListItemDto>> ListAsync(ListIncidentsQuery query, CancellationToken ct)
    {
        var page = query.Page <= 0 ? 1 : query.Page;
        var pageSize = query.PageSize <= 0 ? 25 : query.PageSize;
        
        var baseQuery = _db.Incidents
            .AsNoTracking()
            .Where(i => i.CompanyId == query.CompanyId);

        var totalCount = await baseQuery.CountAsync(ct);

        var incidents = await baseQuery
            .OrderBy(i => i.OccurredAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(i => new IncidentListItemDto(
                i.IncidentId,
                i.OccurredAt,
                i.Type,
                i.Severity,
                i.Status,
                i.LocationName,
                i.Latitude,
                i.Longitude
            )).ToListAsync(ct);

        return new PagedResult<IncidentListItemDto>(incidents, page, pageSize, totalCount);
    }
}