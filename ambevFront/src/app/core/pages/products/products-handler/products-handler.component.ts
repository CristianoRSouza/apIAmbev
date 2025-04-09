import { Component, inject } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { BaseComponente } from '../../../shared/components/base/base.component';
import { PoDynamicFormField } from '@po-ui/ng-components';
import { NgForm } from '@angular/forms';
import { ProductsService } from '../../../services/produtos.service';
import { Product } from '../../../shared/interfaces/products.interface';

@Component({
  selector: 'app-products-handler',
  imports: [SharedModule],
  templateUrl: './products-handler.component.html',
  styleUrl: './products-handler.component.css'
})
export class ProductsHandlerComponent extends BaseComponente {
  productsService: ProductsService = inject(ProductsService);
  dynamicForm!: NgForm;
  product_id: string = '';
  fields: PoDynamicFormField[] = [
    {
      property: 'title',
      label: 'Title',
      required: true,
      showRequired: true,
      gridColumns: 4
    },
    {
      property: 'price',
      label: 'Price',
      type: 'currency',
      required: true,
      showRequired: true,
      gridColumns: 4
    },
    {
      property: 'description',
      label: 'Description',
      required: true,
      showRequired: true,
      gridColumns: 4
    },
    {
      property: 'category',
      label: 'Category',
      required: true,
      showRequired: true,
      gridColumns: 4
    },
    {
      property: 'image',
      label: 'Image',
      type: 'upload',
      required: true,
      showRequired: true,
      gridColumns: 4,
    },
    {
      property: 'rate',
      label: 'Rate',
      type: 'number',
      required: true,
      showRequired: true,
      gridColumns: 4
    },
    {
      property: 'count',
      label: 'Count',
      type: 'number',
      required: true,
      showRequired: true,
      gridColumns: 4
    }
  ]
  product_values = {}

  ngOnInit() {
    this.product_id = this.route.snapshot.params['id'];
    if (this.product_id) {
      this.loadUser();
    }
  }

  getForm(form: NgForm) {
    this.dynamicForm = form;
  }

  save() {
    const product = this.mapToUser(this.dynamicForm.form.value)
    if (this.product_id) {
      this.updateProduct(product);
      return;
    }

    this.createProduct(product);
  }

  updateProduct(product: Product) {
    this.productsService.productUpdate(this.product_id, product).subscribe({
      next: () => {
        this.router.navigate(['/products-list'])
      },
    })
  }

  createProduct(product: Product) {
    this.productsService.productCreate(product).subscribe({
      next: () => {
        this.router.navigate(['/products-list'])
      },
    })
  }

  cancel() {
    this.router.navigate(['/products-list'])
  }

  mapToUser(data: any): Product {
    return {
      id: this.product_id,
      title: data.title,
      price: data.price,
      description: data.description,
      category: data.category,
      image: data.image,
      rating: {
        rate: data.rate,
        count: data.count
      }
    }
  }

  loadUser() {
    this.productsService.productListOne(this.product_id).subscribe((product: any) => {
      this.product_values = product;
      this.dynamicForm.form.patchValue({
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
        rate: product.rating.rate,
        count: product.rating.count,
      });
    })
  }
}
