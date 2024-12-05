using Microsoft.EntityFrameworkCore;

namespace ExpenseTrackerBackend.Models
{
    public class AppDbContext : DbContext
    {
        public DbSet<Expense> Expenses { get; set; } = null!; // Initialisé avec null!

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
    }
}
