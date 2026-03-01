namespace api.Domain.Entities;

public sealed class Severity
{ 
    private Severity(string value) => Value = value;

    public string Value { get; }

    public static readonly Severity Low = new("Low");
    
    public static readonly Severity Medium = new("Medium");
    
    public static readonly Severity High = new("High");

    public static bool TryFrom(string? input, out Severity severity)
    {
        severity = null!;

        if (string.IsNullOrWhiteSpace(input))
            return false;

        var v = input.Trim().ToLowerInvariant();

        severity = v switch
        {
            "low" or "minor" => Low,
            "medium" or "moderate" => Medium,
            "high" or "critical" or "major" => High,
            _ => null!
        };

        return severity is not null;
    }

    public static Severity Reconstitute(string input)
        => TryFrom(input, out var s) ? s : throw new ArgumentException($"Unknown severity: {input}");

    public override string ToString() => Value;
}