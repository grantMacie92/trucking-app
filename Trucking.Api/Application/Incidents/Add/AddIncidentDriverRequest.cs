namespace api.Application.Incidents.Add;

public class AddIncidentDriverRequest
{
    public int DriverId { get; init; }

    public bool? IsAtFault { get; init; }
    
    public bool? Injured { get; init; }
    
    public string? Notes { get; init; }
}