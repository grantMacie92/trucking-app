namespace api.Domain.Entities;

public class Driver : EntityBase
{
    public int DriverId { get; private init;}
    
    public int CompanyId { get; set; }
    
    public required string FirstName { get; set; }
    
    public required string LastName { get; set; }
    
    public required string LicenseNumber { get; set; }
    
    public required string Status { get; set; }
    
    public DateTime HireDate { get; set; }
    
    public DateTime DateOfBirth { get; set; }

    public Company Company { get; set; }

    public List<DriverTruck> DriverTrucks { get; set; }
    
    public List<IncidentDriver> IncidentDrivers { get; set; }
}