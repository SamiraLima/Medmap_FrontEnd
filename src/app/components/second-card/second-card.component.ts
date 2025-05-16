import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router'; // Importe o Router
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
  @Input() medicamento: any;
  showPopup = false;

  constructor(private router: Router) {} // Injete o Router

  abrirPopup() {
    this.showPopup = true;
  }

  cancelarExclusao() {
    this.showPopup = false;
  }

  confirmarExclusao() {
    console.log('Excluir medicamento', this.medicamento.id);
    this.showPopup = false;
  }

  editarMedicamento() {
    this.router.navigate(['/editar', this.medicamento.id]); // Navegação programática
  }
}