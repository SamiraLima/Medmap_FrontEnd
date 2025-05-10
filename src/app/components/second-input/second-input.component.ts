import { Component, Input, forwardRef  } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';


type InputTyper = "password" | "text"

@Component({
  selector: 'app-second-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SecondInputComponent),
      multi: true
    }
  ],
  templateUrl: './second-input.component.html',
  styleUrl: './second-input.component.scss'
})
export class SecondInputComponent implements ControlValueAccessor {

  @Input() type: InputTyper= "text"; 
  @Input() placeholder: string= ""; 
  @Input() label: string= ""; 
  @Input() inputName: string= ""; 
  


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
