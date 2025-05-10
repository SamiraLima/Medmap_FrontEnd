import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PopupDeleteMedicamentoComponent } from '../popup-delete-medicamento/popup-delete-medicamento.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-second-card',
  standalone: true,
  imports: [FormsModule, RouterModule, PopupDeleteMedicamentoComponent, NgIf],
  templateUrl: './second-card.component.html',
  styleUrl: './second-card.component.scss'
})
export class SecondCardComponent {

  ativo: boolean = true;
  @Input() medicamento: any;

  showPopup = false;

  abrirPopup() {
    this.showPopup = true;
  }

  cancelarExclusao() {
    this.showPopup = false;
  }

  confirmarExclusao() {
    console.log('Excluir medicamento', this.medicamento.id);
    // Aqui você pode chamar um método do serviço para excluir o medicamento
    this.showPopup = false;
  }
  
}
