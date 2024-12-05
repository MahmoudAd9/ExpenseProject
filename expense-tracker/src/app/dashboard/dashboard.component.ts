import { Component } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { Expense } from '../../../expense';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  expenses: Expense[] = [];
  totalExpenses: number = 0;
  budget: number = 1000; // Exemple de budget mensuel
  overBudget: boolean = false;

  constructor(private expenseService: ExpenseService) {

    this.expenses = this.expenseService.getExpenses(); // Récupérer les dépenses via le service
    this.calculateTotalExpenses();
  }

  calculateTotalExpenses() {
    this.totalExpenses = this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    this.overBudget = this.totalExpenses > this.budget;
  }
  deleteExpense(index: number) {
    this.expenseService.deleteExpense(index);
    this.calculateTotalExpenses(); // Recalcule les dépenses totales après suppression
  }
}
