import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from '../../../expense';


@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiUrl = 'http://localhost:5257/api/expenses'; // Remplacez par l'URL de votre API si déployée

  constructor(private http: HttpClient) { }

  // Méthode pour ajouter une dépense
  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.apiUrl, expense);
  }

  // Méthode pour récupérer toutes les dépenses
  getExpenses(): Observable<Expense[]> {
    console.log('Fetching expenses from API...');
    return this.http.get<Expense[]>(this.apiUrl);
  }

  // Méthode pour supprimer une dépense par ID
  deleteExpense(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Méthode pour mettre à jour une dépense
  updateExpense(id: number, expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(`${this.apiUrl}/${id}`, expense);
  }

  // Méthode pour filtrer les dépenses
  filterExpenses(category: string, startDate: string, endDate: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}/filter`, {
      params: { category, startDate, endDate }
    });
  }
}
