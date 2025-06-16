import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  imports: [FormsModule],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css',
})
export class DatePickerComponent {
  @Output() dateSelected = new EventEmitter<{
    startDate: string;
    endDate: string;
  }>();

  fechaInicio: string | null = null;
  fechaFin: string | null = null;

  filtrarFecha() {
    if (this.fechaInicio && this.fechaFin) {
      this.dateSelected.emit({
        startDate: this.fechaInicio,
        endDate: this.fechaFin,
      });
    }
  }

  limpiarFiltro() {
    this.fechaInicio = null;
    this.fechaFin = null;
    this.dateSelected.emit({
      startDate: '',
      endDate: '',
    });
  }
}