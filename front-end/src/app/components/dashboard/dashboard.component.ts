import { Component, OnInit } from '@angular/core';
import { GastosService } from '../../services/gastos.service';
import { Gasto } from '../../models/gasto.model';
import { CommonModule, NgFor } from '@angular/common';
import { IngresoEgresoComponent } from "../reports/charts/ingreso-egreso.component";
import { TareasService } from '../../services/tareas.service';
import { ClienteService } from '../../services/clientes.service';

@Component({
  selector: 'app-dashboard',
  imports: [NgFor, CommonModule, IngresoEgresoComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  gastos: Gasto[] = [];
  tareas: any[] = [];
  clientes: any[] = []; 

  constructor(
    private gastosService: GastosService,
    private tareasService: TareasService,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.gastosService.getGastos().subscribe({
      next: (data) => (this.gastos = data),
      error: (error) => console.error('Error fetching gastos:', error),
    });

    // Fetch tasks using TareasService
    this.tareasService.getTareas().subscribe({
      next: (data) => (this.tareas = data),  
      error: (error) => console.error('Error fetching tasks:', error),
    });

    // Fetch the latest customers 
    this.clienteService.getClientes().subscribe({
      next: (data) => (this.clientes = data),
      error: (error) => console.error('Error fetching clientes:', error),
    });
  } 
}
