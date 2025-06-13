import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-default-login-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './default-login-layout.component.html',
  styleUrl: './default-login-layout.component.scss'
})
export class DefaultLoginLayoutComponent {
  @Input() titulo: string = "";
  @Input() aTexto: string = "";
  @Input() pTexto: string = "";
  @Input() aLink: string = '';
  @Input() btnTexto: string = "";

}
