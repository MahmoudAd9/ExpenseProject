import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BaseChartDirective} from 'ng2-charts';
import { ExpenseService } from '../services/expense.service';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(PieController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule,BaseChartDirective],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  categories: string[] = ['Food', 'Transport', 'Entertainment', 'Other'];
  categoryData: number[] = [];

  public pieChartLabels = this.categories;
  public pieChartData = {
    labels: this.pieChartLabels,
    datasets: [
      {
        data: this.categoryData,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };


  constructor(private expenseService: ExpenseService) {
    this.calculateCategoryData();
  }

  calculateCategoryData() {
    const expenses = this.expenseService.getExpenses();
    console.log('Expenses:', expenses);

    this.categoryData = this.categories.map((category) =>
      expenses
        .filter((expense) => expense.category === category)
        .reduce((sum, expense) => sum + expense.amount, 0)
    );

    // Met à jour les données du graphique
    this.pieChartData.datasets[0].data = this.categoryData;

    console.log('Category Data:', this.categoryData);
    console.log('Pie Chart Data:', this.pieChartData);
  }
}



