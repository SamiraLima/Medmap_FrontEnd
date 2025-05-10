import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-popup-delete-medicamento',
  standalone: true,
  imports: [],
  templateUrl: './popup-delete-medicamento.component.html',
  styleUrl: './popup-delete-medicamento.component.scss'
})
export class PopupDeleteMedicamentoComponent {


  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }

}
