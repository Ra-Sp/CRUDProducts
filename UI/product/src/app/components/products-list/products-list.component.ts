import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: Product[] = [];
  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getAllProducts()
      .subscribe({
        next: (products) => {
          // console.log(products);
          this.products = products;
        },
        error: (response) => {
          console.log(response);
        }
      });
  }

  deleteProduct(id: any) {
    this.productsService.deleteProduct(id)
      .subscribe({
        next: (response) => {
          window.alert("Product with id " + id + " deleted");
          window.location.reload();
        }
      });
  }

  populateForm(id: any) {
    this.productsService.populateForm(id);
  }

}
