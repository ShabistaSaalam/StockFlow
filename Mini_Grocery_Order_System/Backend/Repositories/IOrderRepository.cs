using Backend.Models;
using Microsoft.EntityFrameworkCore.Storage;

namespace Backend.Repositories
{
    public interface IOrderRepository
    {
        Task AddAsync(Order order);
        Task<IDbContextTransaction> BeginTransactionAsync();
    }
}
