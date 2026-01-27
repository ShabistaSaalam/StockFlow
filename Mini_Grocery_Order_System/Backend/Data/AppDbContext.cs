using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Product> Products => Set<Product>();
        public DbSet<Order> Orders => Set<Order>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed products directly in database
            modelBuilder.Entity<Product>().HasData(
                new Product { Id = 1, Name = "Apple", Price = 10, Stock = 100 },
                new Product { Id = 2, Name = "Milk", Price = 25, Stock = 50 },
                new Product { Id = 3, Name = "Bread", Price = 20, Stock = 30 }
            );
        }
    }
}
