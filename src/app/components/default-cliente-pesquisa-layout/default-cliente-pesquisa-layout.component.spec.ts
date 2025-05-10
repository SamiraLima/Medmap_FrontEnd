import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultClientePesquisaLayoutComponent } from './default-cliente-pesquisa-layout.component';

describe('DefaultClientePesquisaLayoutComponent', () => {
  let component: DefaultClientePesquisaLayoutComponent;
  let fixture: ComponentFixture<DefaultClientePesquisaLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultClientePesquisaLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultClientePesquisaLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
