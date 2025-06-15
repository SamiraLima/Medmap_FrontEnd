import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';              // ← importe aqui
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { PrimaryButtonComponent } from '../../components/primary-button/primary-button.component';
import { AuthService, LoginRequest } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,                                       // ← adicione aqui
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent,
    PrimaryButtonComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      cnes: new FormControl('', [Validators.required]), // Ajustado para "cnes"
      senha: new FormControl('', [Validators.required, Validators.minLength(7)])
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const dados: LoginRequest = {
        cnes: this.loginForm.value.cnes,
        password: this.loginForm.value.senha
      };
      this.authService.login(dados).subscribe({
        next: (token) => {
          console.log('Login bem-sucedido, token:', token);
          this.router.navigate(['/funcionario']);
        },
        error: (err) => {
          console.error('Erro ao fazer login:', err);
          alert('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
        }
      });
    } else {
      let erros: string[] = [];
      if (this.loginForm.get('cnes')?.hasError('required')) erros.push('CNES é obrigatório.');
      if (this.loginForm.get('senha')?.hasError('required')) erros.push('Senha é obrigatória.');
      if (this.loginForm.get('senha')?.hasError('minlength')) erros.push('A senha deve ter no mínimo 7 caracteres.');
      alert('Por favor, corrija os seguintes erros:\n- ' + erros.join('\n- '));
    }
  }
}