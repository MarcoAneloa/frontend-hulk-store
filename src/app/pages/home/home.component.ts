import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { DataService } from '../../services/data.service';
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
        search: ''
      };

      // Make a deep copy of the original data to keep it immutable
      this.products = this.originalData;
      /*  this.sortProducts('name'); */
    });
  }

  onSearchChange(search) {
    this.mainFilter.search = search.search;
    this.updateProducts({
      type: 'search',
      change: search.change
    });
  }

  updateProducts(filter) {
    let productsSource = this.originalData.products;
    const prevProducts = this.products;
    let filterAllData = true;
    if ((filter.type === 'search' && filter.change === 1) || (filter.type === 'category' && filter.change === -1)) {
      productsSource = this.products;
      filterAllData = false;
    }
    // console.log('filtering ' + productsSource.length + ' products')

    this.products = productsSource.filter(product => {
      // Filter by search
      if (filterAllData || filter.type === 'search') {
        if (!product.name.match(new RegExp(this.mainFilter.search, 'i'))) {
          return false;
        }
      }

      return true;
    });

    // If the number of products increased after the filter has been applied then sort again
    // If the number of products remained equal, there's a high chance that the items have been reordered.
    if (prevProducts.length <= this.products.length && this.products.length > 1) {
      this.sortProducts(this.currentSorting);
    }

    // These two types of filters usually add new data to the products showcase so a sort is necessary
    if (filter.type === 'custom' || filter.type === 'price') {
      this.sortProducts(this.currentSorting);
    }
  }

  sortProducts(criteria) {
    // console.log('sorting ' + this.products.length + ' products')
    this.products.sort((a, b) => {
      const priceComparison = parseFloat(a.price.toString().replace(/\./g, '').replace(',', '.')) - parseFloat(b.price.toString().replace(/\./g, '').replace(',', '.'));
      if (criteria === 'priceDes') {
        return -priceComparison;
      } else if (criteria === 'priceAsc') {
        return priceComparison;
      } else if (criteria === 'name') {
        const nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      } else {
        // Keep the same order in case of any unexpected sort criteria
        return -1;
      }
    });
    this.currentSorting = criteria;
  }
}