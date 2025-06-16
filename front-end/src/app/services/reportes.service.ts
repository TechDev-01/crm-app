import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportesService {

  constructor(private http: HttpClient) {}

  getIngresosMensuales(month: number, year: number): Observable<any> {
    return this.http.get(`http://localhost:3000/api/reportes/mensual?month=${month}&year=${year}`);
  }
}
