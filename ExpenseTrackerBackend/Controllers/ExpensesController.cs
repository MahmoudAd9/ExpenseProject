using ExpenseTrackerBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTrackerBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExpensesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ExpensesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/expenses
        [HttpGet]
        public async Task<IActionResult> GetExpenses()
        {
            return Ok(await _context.Expenses.ToListAsync());
        }

        // POST: api/expenses
        [HttpPost]
        public async Task<IActionResult> AddExpense([FromBody] Expense expense)
        {
            if (expense == null)
                return BadRequest("Expense data is required.");

            _context.Expenses.Add(expense);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetExpenses), new { id = expense.Id }, expense);
        }

        // PUT: api/expenses/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateExpense(int id, [FromBody] Expense expense)
        {
            if (id != expense.Id)
                return BadRequest("Expense ID mismatch.");

            var existingExpense = await _context.Expenses.FindAsync(id);
            if (existingExpense == null)
                return NotFound();

            // Mise à jour des données
            existingExpense.Name = expense.Name;
            existingExpense.Amount = expense.Amount;
            existingExpense.Category = expense.Category;
            existingExpense.Date = expense.Date;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/expenses/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExpense(int id)
        {
            var expense = await _context.Expenses.FindAsync(id);
            if (expense == null)
                return NotFound();

            _context.Expenses.Remove(expense);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // GET: api/expenses/filter?category={category}&startDate={startDate}&endDate={endDate}
        [HttpGet("filter")]
        public async Task<IActionResult> GetFilteredExpenses([FromQuery] string? category, [FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
        {
            var query = _context.Expenses.AsQueryable();

            // Filtrer par catégorie si spécifiée
            if (!string.IsNullOrEmpty(category))
                query = query.Where(e => e.Category == category);

            // Filtrer par date de début si spécifiée
            if (startDate.HasValue)
                query = query.Where(e => e.Date >= startDate.Value);

            // Filtrer par date de fin si spécifiée
            if (endDate.HasValue)
                query = query.Where(e => e.Date <= endDate.Value);

            var filteredExpenses = await query.ToListAsync();
            return Ok(filteredExpenses);
        }
    }
}
