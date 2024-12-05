import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { Expense } from '../../../expense';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  expenses: Expense[] = [];
  totalExpenses: number = 0;
  budget: number = 1000; // Monthly budget
  overBudget: boolean = false;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.fetchExpenses();
  }

  fetchExpenses(): void {
    this.expenseService.getExpenses().subscribe({
      next: (data) => {
        console.log('Fetched expenses:', data); // Ajoutez ce log
        this.expenses = data; // Assignez les données au tableau
        this.calculateTotalExpenses(); // Recalculez le total des dépenses
      },
      error: (error) => {
        console.error('Error fetching expenses:', error); // Ajoutez un log pour les erreurs
      },
    });
  }


  calculateTotalExpenses(): void {
    this.totalExpenses = this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    this.overBudget = this.totalExpenses > this.budget;
  }

  deleteExpense(id: number): void {
    this.expenseService.deleteExpense(id).subscribe({
      next: () => {
        // Remove the deleted expense locally
        this.expenses = this.expenses.filter((expense) => expense.id !== id);
        this.calculateTotalExpenses();
      },
      error: (error) => {
        console.error('Error deleting expense:', error);
      },
    });
  }
}
