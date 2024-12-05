import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.css'
})
export class AddExpenseComponent {

  constructor(private expenseService: ExpenseService){}

  expense = {
    name: '',
    amount: 0,
    category: '',
    date: '',
  };

  onSubmit() {
    this.expenseService.addExpense(this.expense); // Ajouter la dépense via le service
    alert('Expense added successfully!');
    this.resetForm();
  }

  resetForm() {
    this.expense = {
      name: '',
      amount: 0,
      category: '',
      date: '',
    };
  }
}
