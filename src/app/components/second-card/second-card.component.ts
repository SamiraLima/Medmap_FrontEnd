import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { PopupDeleteMedicamentoComponent } from '../popup-delete-medicamento/popup-delete-medicamento.component';
import { NgIf } from '@angular/common';
import { AuthService, Medicamento } from '../../services/auth.service';

@Component({
  selector: 'app-second-card',
  standalone: true,
  imports: [FormsModule, RouterModule, PopupDeleteMedicamentoComponent, NgIf],
  templateUrl: './second-card.component.html',
  styleUrl: './second-card.component.scss'
})
export class SecondCardComponent {
  @Input() medicamento!: Medicamento;
  showPopup = false;

  constructor(private authService: AuthService, private router: Router) {}

  abrirPopup() {
    this.showPopup = true;
  }

  cancelarExclusao() {
    this.showPopup = false;
  }

  confirmarExclusao() {
    if (confirm('Tem certeza que deseja excluir este medicamento?')) {
      this.authService.deletarMedicamento(this.medicamento.id).subscribe({
        next: () => {
          console.log('Medicamento excluído com sucesso');
          window.location.reload(); // Recarrega a página para atualizar a lista
        },
        error: (err) => {
          console.error('Erro ao excluir medicamento:', err);
          alert('Erro ao excluir medicamento. Tente novamente.');
        }
      });
    }
    this.showPopup = false;
  }

  editarMedicamento() {
    this.router.navigate(['/editar', this.medicamento.id]);
  }

  atualizarStatus() {
    const ubsId = this.authService.getUbsId();
    if (!ubsId) {
      alert('Erro: UBS ID não encontrado. Faça login novamente.');
      this.authService.logout();
      this.router.navigate(['/login']);
      return;
    }

    const dadosAtualizados: Medicamento = {
      id: this.medicamento.id,
      nome: this.medicamento.nome,
      informacoes: this.medicamento.informacoes,
      imagemUrl: this.medicamento.imagemUrl,
      ativo: this.medicamento.ativo,
      ubsId: ubsId
    };

    this.authService.atualizarMedicamento(dadosAtualizados).subscribe({
      next: (response) => {
        console.log('Status do medicamento atualizado com sucesso:', response);
      },
      error: (err) => {
        console.error('Erro ao atualizar status do medicamento:', {
          status: err.status,
          message: err.message,
          error: err.error
        });
        alert('Erro ao atualizar status do medicamento. Tente novamente.');
        this.medicamento.ativo = !this.medicamento.ativo;
      }
    });
  }
}