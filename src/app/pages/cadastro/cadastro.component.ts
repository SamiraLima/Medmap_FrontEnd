import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';              // ← importe aqui
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { PrimaryButtonComponent } from '../../components/primary-button/primary-button.component';
import { AuthService, CadastroRequest } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [DefaultLoginLayoutComponent, ReactiveFormsModule, PrimaryInputComponent, PrimaryButtonComponent,CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  cadastroForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.cadastroForm = new FormGroup({
      cnes: new FormControl('', [Validators.required]), // Ajustado para "cnes" (sem "s" extra)
      nome: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required, Validators.minLength(7)]),
      endereco: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
  if (this.cadastroForm.valid) {
    const dados: CadastroRequest = this.cadastroForm.value;
    this.authService.cadastrar(dados).subscribe({
      next: (response) => {
        console.log('Cadastro realizado com sucesso:', response);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erro ao cadastrar:', err);
        alert('Erro ao realizar cadastro. Verifique os dados e tente novamente.');
      }
    });
  } else {
    let erros: string[] = [];
    if (this.cadastroForm.get('cnes')?.hasError('required')) erros.push('CNES é obrigatório.');
    if (this.cadastroForm.get('nome')?.hasError('required')) erros.push('Nome é obrigatório.');
    if (this.cadastroForm.get('senha')?.hasError('required')) erros.push('Senha é obrigatória.');
    if (this.cadastroForm.get('senha')?.hasError('minlength')) erros.push('A senha deve ter no mínimo 7 caracteres.');
    if (this.cadastroForm.get('endereco')?.hasError('required')) erros.push('Endereço é obrigatório.');
    alert('Por favor, corrija os seguintes erros:\n- ' + erros.join('\n- '));
  }
}
}