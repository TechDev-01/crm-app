import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormControl } from '@angular/forms';
import { ReportesService } from '../../../services/reportes.service';
import { CommonModule } from '@angular/common';
import { MonthPickerComponent } from '../../month-picker/month-picker.component';
import { ReporteMensual } from '../../../models/gastos.interface';
import { LegendPosition } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-ingreso-egreso',
  imports: [NgxChartsModule, CommonModule, MonthPickerComponent],
  templateUrl: './ingreso-egreso.component.html',
  styleUrl: './ingreso-egreso.component.css',
})
export class IngresoEgresoComponent {
  date = new FormControl(new Date());
  chartData: { name: string; value: number }[] = [];
  legendPosition = LegendPosition.Right;
  
  constructor(private reportesService: ReportesService) { }

  getData(month: number, year: number) {
    const selectedDate = this.date.value;
    if (!selectedDate) {
      alert('Please select a date');
      return;
    }

    this.reportesService.getIngresosMensuales(month, year).subscribe((res: ReporteMensual) =>{
      console.log(res);
      this.chartData = [
        {
          name: 'Ingresos',
          value: res.ingresos
        },
        {
          name: 'Egresos',
          value: res.egresos
        }
      ]
    })
  }

  handleMonthChange({ month, year }: { month: number; year: number }) {
    console.log(`Selected month: ${month}, year: ${year}`);
    this.getData(month, year); // Fetch data for the selected month
  }
}
