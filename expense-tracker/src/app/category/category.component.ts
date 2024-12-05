import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ExpenseService } from '../services/expense.service';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';
import { Expense } from '../../../expense';

Chart.register(PieController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
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

  public chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const, // Explicit type assertion
      },
    },
  };

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.calculateCategoryData();
  }

  calculateCategoryData() {
    this.expenseService.getExpenses().subscribe(
      (expenses: Expense[]) => {
        console.log('Expenses:', expenses);

        // Calculer les données pour chaque catégorie
        this.categoryData = this.categories.map((category) =>
          expenses
            .filter((expense) => expense.category === category)
            .reduce((sum, expense) => sum + expense.amount, 0)
        );

        // Mettre à jour les données du graphique
        this.pieChartData.datasets[0].data = this.categoryData;

        console.log('Category Data:', this.categoryData);
        console.log('Pie Chart Data:', this.pieChartData);
      },
      (error) => {
        console.error('Error fetching expenses:', error);
      }
    );
  }
}
