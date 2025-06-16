import { Component, Output, EventEmitter, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Gasto, Usuario } from '../../models/gasto.model';

@Component({
  selector: 'app-gasto-modal',
  imports: [FormsModule, NgIf],
  templateUrl: './gasto-modal.component.html',
  styleUrl: './gasto-modal.component.css'
})
export class GastoModalComponent {
  @Input() mostrarModal = false;
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() gastoAdded = new EventEmitter<Gasto>();

  onSubmit(gastoForm: HTMLFormElement) {
    const formData = new FormData(gastoForm);
    const gasto: Gasto = {
      _id: '',
      descripcion: formData.get('descripcion') as string,
      fecha: formData.get('fecha') as string,
      monto: parseFloat(formData.get('monto') as string),
      categoria: formData.get('categoria') as string,
      usuario: JSON.parse(formData.get('usuario') as string) as Usuario,
      metodoPago: formData.get('metodoPago') as string,
      comprobanteUrl: formData.get('comprobanteUrl') as string
    };

    this.gastoAdded.emit(gasto);
    gastoForm.reset();
  }

  closeModal() {
    this.cerrarModal.emit();
  }
}
