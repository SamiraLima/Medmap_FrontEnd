import { Component, OnInit } from '@angular/core';
import { DefaultClientePesquisaLayoutComponent } from '../../components/default-cliente-pesquisa-layout/default-cliente-pesquisa-layout.component';
import { RouterModule, Router } from '@angular/router';
import { SecondCardComponent } from '../../components/second-card/second-card.component';
import { NgFor, NgIf } from '@angular/common';
import { AuthService, Medicamento } from '../../services/auth.service';

@Component({
  selector: 'app-funcionario',
  standalone: true,
  imports: [DefaultClientePesquisaLayoutComponent, RouterModule, SecondCardComponent, NgFor, NgIf],
  templateUrl: './funcionario.component.html',
  styleUrl: './funcionario.component.scss'
})
export class FuncionarioComponent implements OnInit {
  medicamentos: Medicamento[] = [];

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
      this.authService.getMedicamentos(cnes).subscribe({
        next: (medicamentos) => {
          this.medicamentos = medicamentos;
        },
        error: (err) => {
          console.error('Erro ao buscar medicamentos:', err);
          alert('Erro ao carregar os medicamentos. Tente novamente.');
          this.authService.logout();
          this.router.navigate(['/login']);
        }
      });
    } else {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
}