import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  product: Product = {
    id: '',
    prodName: '',
    quantity: 0,
    unitPrice: 0,
    mId: '',
    manufacturer: '',
    inStock: true
  }

  updateEnabled: boolean = false;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.selectedProduct$.subscribe((product) => {
      if (product) {
        this.product = { ...product };
        this.updateEnabled = true;
      }
    });
  }

  onSubmit() {
    this.productsService.addProduct(this.product)
      .subscribe({
        next: () => {
          window.alert("Product added.")
          window.location.reload();
        },
        error: (response) => {
          console.log(response);
        }
      });
  }


  onEdit() {
    this.productsService.updateProduct(this.product.id, this.product)
      .subscribe({
        next: (response) => {
          window.alert("Product with id " + this.product.id + " updated");
          window.location.reload();
        }
      });
  }

}
