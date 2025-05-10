import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef  } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';


type InputTyper = "password" | "text"

@Component({
  selector: 'app-primary-input',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrimaryInputComponent),
      multi: true
    }
  ],
  templateUrl: './primary-input.component.html',
  styleUrl: './primary-input.component.scss'
})
export class PrimaryInputComponent implements ControlValueAccessor {

  @Input() type: InputTyper= "text"; 
  @Input() placeholder: string= ""; 
  @Input() label: string= ""; 
  @Input() inputName: string= ""; 
  @Input() marginBottom: string = '3px';

  


  value: string = ''
  onChange: any = () => {}
  onTouched: any = () => {}

  onInput(event: Event){
    const value = (event.target as HTMLInputElement).value
    this.onChange(value)
  }

  writeValue(value: any): void {
    this.value = value
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

}
