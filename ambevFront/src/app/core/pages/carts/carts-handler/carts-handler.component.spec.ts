import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartsHandlerComponent } from './carts-handler.component';

describe('CartsHandlerComponent', () => {
  let component: CartsHandlerComponent;
  let fixture: ComponentFixture<CartsHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartsHandlerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartsHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
