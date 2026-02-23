namespace api.Data;

using Domain.Entities;
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Company> Companies => Set<Company>();
    public DbSet<Driver> Drivers => Set<Driver>();
    
    public DbSet<Truck> Trucks => Set<Truck>();
    public DbSet<Incident> Incidents => Set<Incident>();

    public DbSet<IncidentDriver> IncidentDrivers => Set<IncidentDriver>();
    public DbSet<IncidentTruck> IncidentTrucks => Set<IncidentTruck>();
    public DbSet<DriverTruck> DriverTrucks => Set<DriverTruck>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // PKs
        modelBuilder.Entity<Company>().HasKey(x => x.CompanyId);
        modelBuilder.Entity<Driver>().HasKey(x => x.DriverId);
        modelBuilder.Entity<Truck>().HasKey(x => x.TruckId);
        modelBuilder.Entity<Incident>().HasKey(x => x.IncidentId);

        // Composite PKs (join tables)
        modelBuilder.Entity<IncidentDriver>().HasKey(x => new { x.IncidentId, x.DriverId });
        modelBuilder.Entity<IncidentTruck>().HasKey(x => new { x.IncidentId, x.TruckId });
        modelBuilder.Entity<DriverTruck>().HasKey(x => new { x.DriverId, x.TruckId });

        // Company 1-to-many
        modelBuilder.Entity<Driver>()
            .HasOne(d => d.Company)
            .WithMany(c => c.Drivers)
            .HasForeignKey(d => d.CompanyId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Truck>()
            .HasOne(t => t.Company)
            .WithMany(c => c.Trucks)
            .HasForeignKey(t => t.CompanyId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Incident>()
            .HasOne(i => i.Company)
            .WithMany(c => c.Incidents)
            .HasForeignKey(i => i.CompanyId)
            .OnDelete(DeleteBehavior.Restrict);

        // IncidentDriver (Incident <-> Driver)
        modelBuilder.Entity<IncidentDriver>()
            .HasOne(x => x.Incident)
            .WithMany(i => i.IncidentDrivers)
            .HasForeignKey(x => x.IncidentId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<IncidentDriver>()
            .HasOne(x => x.Driver)
            .WithMany(d => d.IncidentDrivers)
            .HasForeignKey(x => x.DriverId)
            .OnDelete(DeleteBehavior.Restrict);

        // IncidentTruck (Incident <-> Truck)
        modelBuilder.Entity<IncidentTruck>()
            .HasOne(x => x.Incident)
            .WithMany(i => i.IncidentTrucks)
            .HasForeignKey(x => x.IncidentId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<IncidentTruck>()
            .HasOne(x => x.Truck)
            .WithMany(t => t.IncidentTrucks)
            .HasForeignKey(x => x.TruckId)
            .OnDelete(DeleteBehavior.Restrict);

        // DriverTruck (Driver <-> Truck assignment history)
        modelBuilder.Entity<DriverTruck>()
            .HasOne<Driver>()
            .WithMany(d => d.DriverTrucks)
            .HasForeignKey(x => x.DriverId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<DriverTruck>()
            .HasOne<Truck>()
            .WithMany(t => t.DriverTrucks)
            .HasForeignKey(x => x.TruckId)
            .OnDelete(DeleteBehavior.Restrict);

        // Indexes
        modelBuilder.Entity<Truck>()
            .HasIndex(t => t.Vin)
            .IsUnique();

        modelBuilder.Entity<IncidentDriver>().HasIndex(x => x.DriverId);
        modelBuilder.Entity<IncidentTruck>().HasIndex(x => x.TruckId);
        modelBuilder.Entity<DriverTruck>().HasIndex(x => x.TruckId);

        modelBuilder.Entity<Driver>().HasIndex(x => x.CompanyId);
        modelBuilder.Entity<Truck>().HasIndex(x => x.CompanyId);
        modelBuilder.Entity<Incident>().HasIndex(x => x.CompanyId);
    }
}
