import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarpersonaComponent } from './modificarpersona.component';

describe('ModificarpersonaComponent', () => {
  let component: ModificarpersonaComponent;
  let fixture: ComponentFixture<ModificarpersonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarpersonaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarpersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
