using Microsoft.EntityFrameworkCore;
using ProductCRUD.Models.Domain;

namespace ProductCRUD.Data
{
    public class ProductDbContext : DbContext
    {
        public ProductDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
    }
}
