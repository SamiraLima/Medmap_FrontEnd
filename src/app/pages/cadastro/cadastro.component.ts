import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { PrimaryButtonComponent } from '../../components/primary-button/primary-button.component';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [DefaultLoginLayoutComponent, ReactiveFormsModule, PrimaryInputComponent, PrimaryButtonComponent],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  cadastroForm!: FormGroup

  constructor(){
    this.cadastroForm = new FormGroup({
      cness: new FormControl('', [Validators.required]),
      nome: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required, Validators.minLength(7)]),
      endereco: new FormControl('', [Validators.required])
    })
  }

}
