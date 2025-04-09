import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsHandlerComponent } from './products-handler.component';

describe('ProductsHandlerComponent', () => {
  let component: ProductsHandlerComponent;
  let fixture: ComponentFixture<ProductsHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsHandlerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
