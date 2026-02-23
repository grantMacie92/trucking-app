using api.Application.Companies.List;

namespace api.Application.Companies;

public interface ICompanyService
{
    Task<List<CompanyListItemDto>> ListAsync(ListCompaniesQuery query, CancellationToken ct);
}