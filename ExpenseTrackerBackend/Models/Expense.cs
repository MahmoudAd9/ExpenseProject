using System.ComponentModel.DataAnnotations;

namespace ExpenseTrackerBackend.Models
{
    public class Expense
    {
        public int Id { get; set; } // Facultatif pour POST car auto-généré par la base de données

        [Required] // Validation pour rendre obligatoire
        public string Name { get; set; } = string.Empty;

        [Required]
        [Range(0, double.MaxValue)] // Validation pour une valeur positive
        public decimal Amount { get; set; }

        [Required]
        public string Category { get; set; } = string.Empty;

        [Required]
        public DateTime Date { get; set; }
    }
}
