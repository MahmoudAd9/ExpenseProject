import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExpenseService } from '../services/expense.service';
import { Expense } from '../../../expense';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.css',
})
export class AddExpenseComponent {
  expense: Partial<Expense> = {
    name: '',
    amount: 0,
    category: '',
    date: undefined,
  };

  constructor(private expenseService: ExpenseService) {}

  onSubmit() {
    // Prepare the expense to send
    const expenseToSend: Expense = {
      ...this.expense,
      id: 0, // Backend assigns the ID
      date: new Date(this.expense.date || '') // Ensures date is correctly parsed
    } as Expense;

    console.log('Sending expense:', expenseToSend); // Debug log

    this.expenseService.addExpense(expenseToSend).subscribe(
      (response) => {
        alert('Expense added successfully!');
        this.resetForm();
      },
      (error) => {
        console.error('Error adding expense:', error);
        alert('Failed to add expense!');
      }
    );
  }

  resetForm() {
    this.expense = {
      name: '',
      amount: 0,
      category: '',
      date: undefined,
    };
  }
}
