import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmigoComponent } from './amigo.component';

describe('AmigoComponent', () => {
  let component: AmigoComponent;
  let fixture: ComponentFixture<AmigoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmigoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
