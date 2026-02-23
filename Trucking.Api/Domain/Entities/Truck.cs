namespace api.Domain.Entities;

public class Truck : EntityBase
{
    public int TruckId { get; private init; }
    
    public int CompanyId { get; set; }
    
    public required string Vin { get; set; }
    
    public required string PlateNumber { get; set; }
    
    public required string Make { get; set; }
    
    public required string Model { get; set; }
    
    public required string Year { get; set; }
    
    public required string Status { get; set; }
    
    public decimal Mileage { get; set; }
    
    public DateTime LastInspectionDate { get; set; }
    
    public required Company Company { get; set; }
    
    public List<IncidentTruck> IncidentTrucks { get; set; }
    
    public List<DriverTruck> DriverTrucks { get; set; }
}