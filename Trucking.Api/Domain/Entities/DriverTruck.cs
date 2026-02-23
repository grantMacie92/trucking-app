namespace api.Domain.Entities;

public class DriverTruck
{
    public required int DriverId { get; set; }
    
    public required int TruckId { get; set; }
    
    public DateTime StartDate { get; set; }
    
    public DateTime? EndDate { get; set; }
}