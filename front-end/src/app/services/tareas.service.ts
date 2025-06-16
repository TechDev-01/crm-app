import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TareasService {
    private apiUrl = 'http://localhost:3000/api/tareas/tasks'; 

    constructor(private http: HttpClient) { }

    getTareas(): Observable<any> {
        return this.http.get(this.apiUrl);
    }
}