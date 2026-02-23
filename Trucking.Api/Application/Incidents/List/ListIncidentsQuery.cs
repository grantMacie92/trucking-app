namespace api.Application.Incidents.List;

public sealed record ListIncidentsQuery
{
    public int CompanyId { get; set; }
    
    // filters
    
    public DateTime?  From { get; init; }
    
    public DateTime? To { get; init; }
    
    public string? Severity { get; init; }
    
    public int? DriverId { get; init; }
    
    public int? TruckId { get; init; }

    public int Page { get; init; } = 1;

    public int PageSize { get; init; } = 25; 

}