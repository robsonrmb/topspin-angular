import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaLoginComponent } from './entrada-login.component';

describe('EntradaLoginComponent', () => {
  let component: EntradaLoginComponent;
  let fixture: ComponentFixture<EntradaLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntradaLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntradaLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
