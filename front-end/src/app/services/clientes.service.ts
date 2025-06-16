import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = 'http://localhost:3000/api/clientes/';

  constructor(private http: HttpClient) {}
    /**
     * Fetches the list of clients from the API.
     * @returns An Observable containing the list of clients.
     */
  getClientes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
