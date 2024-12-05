import { Injectable } from '@angular/core';
import { Expense } from '../../../expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor() { }

  private expenses: Expense[] = [];

  // Méthode pour ajouter une dépense
  addExpense(expense: Expense) {
    this.expenses.push(expense);
  }

  // Méthode pour récupérer toutes les dépenses
  getExpenses():Expense[] {
    
    return this.expenses;
  }
  deleteExpense(index: number) {
    this.expenses.splice(index, 1); // Supprime la dépense à l'index spécifié
  }
}
