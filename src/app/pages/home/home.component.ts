import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { DataService } from '../data.service';
import { Product } from '../shared/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[];
  mainFilter: any;

  currentSorting: string;

  originalData: any = [];

  constructor(private dataService: DataService, private cartService: CartService) { }

  ngOnInit(): void {
    this.dataService.getData().then(data => {
      this.originalData = data;
      this.mainFilter = {
        search: '',
        categories: this.originalData.categories.slice(0),
      };

      // Make a deep copy of the original data to keep it immutable
      this.products = this.originalData.products.slice(0);
     /*  this.sortProducts('name'); */
    });
  }
}