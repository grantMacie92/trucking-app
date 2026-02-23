namespace api.Domain.Entities;

public class Company : EntityBase
{
    public int CompanyId { get; private init; }
    
    public required string Name { get; set; }
    
    public required string DOTNumber { get; set; }
    
    public required string TaxId { get; set; }
    
    public string Status { get; set; }
    
    public List<Driver> Drivers { get; set; } = [];
    
    public List<Truck> Trucks { get; set; }  = [];
    
    public List<Incident> Incidents { get; set; } = [];
}