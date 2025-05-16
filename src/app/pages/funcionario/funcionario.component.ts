import { Component, OnInit } from '@angular/core';
import { DefaultClientePesquisaLayoutComponent } from '../../components/default-cliente-pesquisa-layout/default-cliente-pesquisa-layout.component';
import { RouterModule, Router } from '@angular/router';
import { SecondCardComponent } from '../../components/second-card/second-card.component';
import { NgFor, NgIf } from '@angular/common';
import { AuthService, Medicamento } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http'; // ADIÇÃO: Importação para tipar o erro

@Component({
  selector: 'app-funcionario',
  standalone: true,
  imports: [DefaultClientePesquisaLayoutComponent, RouterModule, SecondCardComponent, NgFor, NgIf],
  templateUrl: './funcionario.component.html',
  styleUrl: './funcionario.component.scss'
})
export class FuncionarioComponent implements OnInit {
  medicamentos: Medicamento[] = [];
  isLoading: boolean = false; // ADIÇÃO: Estado de carregamento

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Verifica se o usuário está logado
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    // Obtém o CNES do usuário logado
    const cnes = this.authService.getCnes();
    if (cnes) {
      console.log('CNES utilizado:', cnes); // ADIÇÃO: Log do CNES para depuração
      this.isLoading = true; // ADIÇÃO: Inicia carregamento
      this.authService.getMedicamentos(cnes).subscribe({
        next: (medicamentos) => {
          this.medicamentos = medicamentos || []; // ADIÇÃO: Garante lista vazia se resposta for null/undefined
          this.isLoading = false; // ADIÇÃO: Finaliza carregamento
          console.log('Medicamentos recebidos:', this.medicamentos); // ADIÇÃO: Log da resposta
        },
        error: (err: HttpErrorResponse) => {
          console.error('Erro ao buscar medicamentos:', {
            status: err.status,
            message: err.message,
            error: err.error,
            headers: err.headers ? err.headers.keys().map(key => `${key}: ${err.headers.get(key)}`) : 'Sem headers'
          }); // ADIÇÃO: Log detalhado com headers
          this.isLoading = false; // ADIÇÃO: Finaliza carregamento
          const errorMessage = typeof err.error === 'string' ? err.error : err.error?.message || err.message;
          if (
            err.status === 404 ||
            err.status === 400 ||
            (errorMessage && errorMessage.toLowerCase().includes('medicamento')) ||
            (errorMessage && errorMessage.toLowerCase().includes('nenhum'))
          ) { // ADIÇÃO: Trata 404, 400, e mensagens relacionadas a medicamentos
            this.medicamentos = [];
            console.log('Tratado como lista vazia'); // ADIÇÃO: Confirmação de tratamento
          } else {
            alert('Erro ao carregar os medicamentos. Tente novamente.');
            this.authService.logout();
            this.router.navigate(['/login']);
          }
        }
      });
    } else {
      console.error('CNES não encontrado'); // ADIÇÃO: Log para CNES inválido
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
}