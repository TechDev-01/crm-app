import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgFor, DatePipe } from '@angular/common';
import { parseISO, format, parse } from 'date-fns';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { GastoModalComponent } from '../../Modals/gasto-modal/gasto-modal.component';
import { GastosService } from '../../services/gastos.service';
import { Gasto } from '../../models/gasto.model';

@Component({
  selector: 'app-payments',
  imports: [
    NgFor,
    CommonModule,
    FormsModule,
    SidebarComponent,
    HeaderComponent,
    DatePickerComponent,
    GastoModalComponent,
  ],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css',
  providers: [DatePipe],
})
export class PaymentsComponent {
  gastos: Gasto[] = [];

  constructor(private gastosService: GastosService) {}

  ngOnInit(): void {
    this.getAllGastos();
  }

  /**
   * This method fetches the list of gastos from the GastosService when the component initializes.
   */
  getAllGastos() {
    this.gastosService.getGastos().subscribe({
      next: (data) => {
        this.gastos = data.map((g) => ({
          ...g,
          fecha: format(parseISO(g.fecha), 'dd/MM/yyyy'),
        }));
      },
      error: (err) => console.error(err),
    });
  }

  /**
   * @param fechas An object containing startDate and endDate strings.
   * @returns If dates are not provided, it fetches all gastos.
   * If dates are provided, it fetches gastos filtered by the specified date range using the getAllGastos method.
   */
  onFiltrarPorFechas(fechas: { startDate: string; endDate: string }) {
    if (!fechas.startDate || !fechas.endDate) {
      this.getAllGastos(); // Fetch all gastos if no dates are provided
      return;
    }

    this.gastosService
      .getGastosByDate(fechas.startDate, fechas.endDate)
      .subscribe({
        next: (data) => (this.gastos = data),
        error: (err) => console.error(err),
      });
  }

  // Display the modal to add a new gasto
  showModal = false;

  onAddGasto(gasto: Gasto) {
    this.gastosService.addGasto(gasto).subscribe({
      next: (data) => {
        this.gastos.push({
          ...data,
          fecha: format(parseISO(data.fecha), 'dd/MM/yyyy'),
        });
      },
    });
  }
}
