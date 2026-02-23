namespace api.Infrastructure;

using Application.Companies;
using Application.Companies.List;
using Data;
using Microsoft.EntityFrameworkCore;

public class CompanyService : ICompanyService
{
    private readonly AppDbContext _db;
    
    public CompanyService(AppDbContext db) {
        _db = db;
    }
    public Task<List<CompanyListItemDto>> ListAsync(ListCompaniesQuery query, CancellationToken ct)
    {
        var companies = _db.Companies
            .AsNoTracking()
            .Select(c => new CompanyListItemDto(c.CompanyId, c.Name))
            .ToListAsync(ct);

        return companies;
    }
}