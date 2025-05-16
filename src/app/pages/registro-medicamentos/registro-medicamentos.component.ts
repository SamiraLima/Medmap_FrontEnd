import { Component, OnInit } from '@angular/core';
import { DefaultRegistroMedicamentoLayoutComponent } from '../../components/default-registro-medicamento-layout/default-registro-medicamento-layout.component';
import { PrimaryButtonComponent } from '../../components/primary-button/primary-button.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SecondInputComponent } from '../../components/second-input/second-input.component';
import { AuthService, RegistroMedicamentoRequest } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importe o CommonModule

@Component({
  selector: 'app-registro-medicamentos',
  standalone: true,
  imports: [
    DefaultRegistroMedicamentoLayoutComponent,
    PrimaryButtonComponent,
    ReactiveFormsModule,
    SecondInputComponent,
    CommonModule // Adicione o CommonModule
  ],
  templateUrl: './registro-medicamentos.component.html',
  styleUrl: './registro-medicamentos.component.scss'
})
export class RegistroMedicamentosComponent implements OnInit {
  registroForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.registroForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  onSubmit() {
    if (this.registroForm.valid) {
      const dados: RegistroMedicamentoRequest = {
        nome: this.registroForm.value.nome,
        informacoes: this.registroForm.value.descricao,
        ativo: true
      };
      this.authService.registrarMedicamento(dados).subscribe({
        next: (response) => {
          console.log('Medicamento registrado com sucesso:', response);
          this.router.navigate(['/funcionario']);
        },
        error: (err) => {
          console.error('Erro ao registrar medicamento:', err);
          alert('Erro ao registrar medicamento. Tente novamente.');
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