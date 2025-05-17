import { Component, OnInit } from '@angular/core';
import { DefaultClientePesquisaLayoutComponent } from '../../components/default-cliente-pesquisa-layout/default-cliente-pesquisa-layout.component';
import { RouterModule, Router } from '@angular/router';
import { SecondCardComponent } from '../../components/second-card/second-card.component';
import { NgFor, NgIf } from '@angular/common';
import { AuthService, Medicamento } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-funcionario',
  standalone: true,
  imports: [DefaultClientePesquisaLayoutComponent, RouterModule, SecondCardComponent, NgFor, NgIf],
  templateUrl: './funcionario.component.html',
  styleUrl: './funcionario.component.scss'
})
export class FuncionarioComponent implements OnInit {
  medicamentos: Medicamento[] = [];
  medicamentosCompletos: Medicamento[] = []; // Lista completa para filtragem
  isLoading: boolean = false;

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
      console.log('CNES utilizado:', cnes);
      this.isLoading = true;
      this.authService.getMedicamentos(cnes).subscribe({
        next: (medicamentos) => {
          this.medicamentosCompletos = medicamentos || [];
          this.medicamentos = [...this.medicamentosCompletos]; // Inicialmente, exibe todos
          this.isLoading = false;
          console.log('Medicamentos recebidos:', this.medicamentos);
        },
        error: (err: HttpErrorResponse) => {
          console.error('Erro ao buscar medicamentos:', {
            status: err.status,
            message: err.message,
            error: err.error,
            headers: err.headers ? err.headers.keys().map(key => `${key}: ${err.headers.get(key)}`) : 'Sem headers'
          });
          this.isLoading = false;
          const errorMessage = typeof err.error === 'string' ? err.error : err.error?.message || err.message;
          if (
            err.status === 404 ||
            err.status === 400 ||
            (errorMessage && errorMessage.toLowerCase().includes('medicamento')) ||
            (errorMessage && errorMessage.toLowerCase().includes('nenhum'))
          ) {
            this.medicamentos = [];
            this.medicamentosCompletos = [];
            console.log('Tratado como lista vazia');
          } else {
            alert('Erro ao carregar os medicamentos. Tente novamente.');
            this.authService.logout();
            this.router.navigate(['/login']);
          }
        }
      });
    } else {
      console.error('CNES não encontrado');
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }

onBuscar(termo: string): void {
  console.log('Busca realizada com termo:', termo); // Para depuração
  if (!termo) {
    this.medicamentos = [...this.medicamentosCompletos];
  } else {
    const termoLower = termo.toLowerCase();
    this.medicamentos = this.medicamentosCompletos.filter(med =>
      med.nome.toLowerCase().includes(termoLower)
    );
  }
}
}