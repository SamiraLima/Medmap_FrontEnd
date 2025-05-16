import { Component, OnInit } from '@angular/core';
import { DefaultRegistroMedicamentoLayoutComponent } from '../../components/default-registro-medicamento-layout/default-registro-medicamento-layout.component';
import { PrimaryButtonComponent } from '../../components/primary-button/primary-button.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SecondInputComponent } from '../../components/second-input/second-input.component';
import { AuthService, EditarMedicamentoRequest, Medicamento } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-medicamentos',
  standalone: true,
  imports: [DefaultRegistroMedicamentoLayoutComponent, PrimaryButtonComponent, ReactiveFormsModule, SecondInputComponent],
  templateUrl: './editar-medicamentos.component.html',
  styleUrl: './editar-medicamentos.component.scss'
})
export class EditarMedicamentosComponent implements OnInit {
  registroForm: FormGroup;
  medicamentoId: number | null = null;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.registroForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    // Verifica se o usuário está logado
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    // Recupera o ID do medicamento da URL
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.medicamentoId = parseInt(id, 10);
        // Busca os dados do medicamento para pré-preencher o formulário
        this.authService.getMedicamentoPorId(this.medicamentoId).subscribe({
          next: (medicamento: Medicamento) => {
            this.registroForm.patchValue({
              nome: medicamento.nome,
              descricao: medicamento.informacoes
            });
          },
          error: (err) => {
            console.error('Erro ao buscar medicamento:', err);
            alert('Erro ao carregar os dados do medicamento. Tente novamente.');
            this.router.navigate(['/funcionario']);
          }
        });
      } else {
        this.router.navigate(['/funcionario']);
      }
    });
  }

  onSubmit() {
    if (this.registroForm.valid && this.medicamentoId !== null) {
      const ubsId = this.authService.getUbsId();
      if (!ubsId) {
        alert('Erro: UBS ID não encontrado. Faça login novamente.');
        this.authService.logout();
        this.router.navigate(['/login']);
        return;
      }

      const dados: EditarMedicamentoRequest = {
        nome: this.registroForm.value.nome,
        informacoes: this.registroForm.value.descricao,
        ubsId: ubsId
      };

      this.authService.editarMedicamento(this.medicamentoId, dados).subscribe({
        next: (response) => {
          console.log('Medicamento editado com sucesso:', response);
          this.router.navigate(['/funcionario']);
        },
        error: (err) => {
          console.error('Erro ao editar medicamento:', err);
          alert('Erro ao editar medicamento. Tente novamente.');
        }
      });
    } else {
      let erros: string[] = [];
      if (this.registroForm.get('nome')?.hasError('required')) erros.push('Nome é obrigatório.');
      if (this.registroForm.get('descricao')?.hasError('required')) erros.push('Informações são obrigatórias.');
      alert('Por favor, corrija os seguintes erros:\n- ' + erros.join('\n- '));
    }
  }
}