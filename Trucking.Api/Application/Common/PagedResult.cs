namespace api.Application.Common;

public sealed record PagedResult<T>(
    IReadOnlyList<T> items,
    int Page,
    int PageSize,
    int TotalCount)
{
    public int TotalPages = (int)Math.Ceiling(TotalCount / (double)PageSize);

    public bool HasNext => Page < TotalPages;

    public bool HasPrevious => Page > 1;
}