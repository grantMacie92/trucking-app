namespace api.Application.Incidents.List;

public sealed record IncidentListItemDto (
    int IncidentId,
    DateTime OccuredAt,
    string Type,
    string Severity,
    string Status,
    string? LocationName,
    decimal Latitude,
    decimal Longitude
);