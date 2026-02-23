namespace api.Domain.Entities;

public class IncidentDriver : EntityBase
{
    public required int IncidentId { get; set; }
    
    public required int DriverId { get; set; }
    
    public bool? IsAtFault { get; set; }
    
    public bool? Injured { get; set; }
    
    public string? Notes { get; set; }

    public Incident Incident { get; set; } = null;

    public Driver Driver { get; set; } = null;
}