namespace api.Domain.Entities;

public class IncidentTruck
{
    public required int IncidentId { get; set; }
    
    public required int TruckId { get; set; }

    public Incident Incident { get; set; } = null;

    public Truck Truck { get; set; } = null;
}