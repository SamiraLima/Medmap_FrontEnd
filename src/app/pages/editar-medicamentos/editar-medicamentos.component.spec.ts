import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMedicamentosComponent } from './editar-medicamentos.component';

describe('EditarMedicamentosComponent', () => {
  let component: EditarMedicamentosComponent;
  let fixture: ComponentFixture<EditarMedicamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarMedicamentosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarMedicamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
