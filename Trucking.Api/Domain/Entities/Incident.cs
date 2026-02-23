namespace api.Domain.Entities;

public class Incident : EntityBase
{
    public int IncidentId { get; set; }
    
    public int CompanyId { get; set; }
    
    public DateTime OccurredAt { get; set; }
    
    public DateTime ReportedAt { get; set; }
    
    public required string Type { get; set; }
    
    public required string Severity { get; set; }
    
    public required string Status { get; set; }
    
    public required string Description { get; set; }
    
    public required string PoliceReportNumber { get; set; }
    
    public bool TowRequired { get; set; }
    
    public int InjuriesCount { get; set; }
    
    public int FatalitiesCount { get; set; }
    
    public decimal VehicleDamageEstimate { get; set; }
    
    public decimal CargoLossEstimate { get; set; }
    
    public decimal TotalCost { get; set; }
    
    public string? LocationName { get; set; }
    
    public required string Address1 { get; set; }
    
    public required string City { get; set; }
    
    public required string State { get; set; }
    
    public required string Zip { get; set; }
    
    public decimal Latitude { get; set; }
    
    public decimal Longitude { get; set; }
    
    public Company Company { get; set; }
    
    public List<IncidentDriver> IncidentDrivers { get; set; }
    
    public List<IncidentTruck> IncidentTrucks { get; set; }
}