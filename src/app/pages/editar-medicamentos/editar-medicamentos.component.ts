import { Component } from '@angular/core';
import { DefaultRegistroMedicamentoLayoutComponent } from '../../components/default-registro-medicamento-layout/default-registro-medicamento-layout.component';
import { PrimaryButtonComponent } from '../../components/primary-button/primary-button.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SecondInputComponent } from '../../components/second-input/second-input.component';



@Component({
  selector: 'app-editar-medicamentos',
  standalone: true,
  imports: [DefaultRegistroMedicamentoLayoutComponent, PrimaryButtonComponent,ReactiveFormsModule, SecondInputComponent],
  templateUrl: './editar-medicamentos.component.html',
  styleUrl: './editar-medicamentos.component.scss'
})
export class EditarMedicamentosComponent {
  registroForm!: FormGroup

  constructor(){
    this.registroForm = new FormGroup({
      nome: new FormControl('',[Validators.required]),
      descricao: new FormControl('', [Validators.required])
    })
  }
}
