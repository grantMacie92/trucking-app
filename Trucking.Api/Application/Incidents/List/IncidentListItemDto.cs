namespace api.Application.Incidents.List;

using Drivers;

public sealed record IncidentListItemDto (
    int IncidentId,
    DateTime OccurredAt,
    string Type,
    string Severity,
    string Status,
    string? LocationName,
    decimal Latitude,
    decimal Longitude,
    List<DriverDto> Drivers
);