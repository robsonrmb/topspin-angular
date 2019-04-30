import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheConviteComponent } from './detalhe-convite.component';

describe('DetalheConviteComponent', () => {
  let component: DetalheConviteComponent;
  let fixture: ComponentFixture<DetalheConviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalheConviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheConviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
