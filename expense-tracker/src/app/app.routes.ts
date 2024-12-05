import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { CategoryComponent } from './category/category.component';

export const routes: Routes = [

  {path:'', component:DashboardComponent},
  {path:'add-expense',component:AddExpenseComponent},
  {path:'category',component:CategoryComponent},
];
