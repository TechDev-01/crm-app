import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gasto } from '../models/gasto.model';

@Injectable({
  providedIn: 'root'
})
export class GastosService {
  private apiUrl = 'http://localhost:3000/api/gastos/general';

  constructor(private http: HttpClient) { }

  getGastos(): Observable<Gasto[]> {
    return this.http.get<Gasto[]>(this.apiUrl);
  }

  getGastosByDate(startDate: string, endDate: string): Observable<Gasto[]> {
    const url = 'http://localhost:3000/api/gastos/filtrar?startDate=' + encodeURIComponent(startDate) + '&endDate=' + encodeURIComponent(endDate);
    return this.http.get<Gasto[]>(url);
  }

  addGasto(gasto: Gasto): Observable<Gasto> {
    const url = 'http://localhost:3000/api/gastos/create';
    return this.http.post<Gasto>(url, gasto);
  }
}
