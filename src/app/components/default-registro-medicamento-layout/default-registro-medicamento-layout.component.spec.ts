import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultRegistroMedicamentoLayoutComponent } from './default-registro-medicamento-layout.component';

describe('DefaultRegistroMedicamentoLayoutComponent', () => {
  let component: DefaultRegistroMedicamentoLayoutComponent;
  let fixture: ComponentFixture<DefaultRegistroMedicamentoLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultRegistroMedicamentoLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultRegistroMedicamentoLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
