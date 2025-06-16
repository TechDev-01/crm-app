import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-month-picker',
  imports: [],
  templateUrl: './month-picker.component.html',
  styleUrl: './month-picker.component.css',
})
export class MonthPickerComponent {
  @Output() monthSelected = new EventEmitter<{ year: number; month: number }>();

  onDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const [year, month] = input.value.split('-').map(Number);
    this.monthSelected.emit({ year, month });
  }
}
