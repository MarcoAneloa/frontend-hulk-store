import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/product.model';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ProductCategoryService } from 'src/app/services/product.category.service';
import { Category } from '../../shared/category.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  id: number;
  product: Product;
  form: FormGroup;
  edit: boolean = false;
  categories: Category[];

  constructor(private productService: ProductService, private productCategoryService: ProductCategoryService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.listCategories();

    this.product = new Product();

    this.form = new FormGroup({
      'id': new FormControl(0),
      'name': new FormControl(''),
      'price': new FormControl(''),
      'stock': new FormControl(''),
      'category': new FormControl('')
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edit = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edit) {
      this.productService.listId(this.id).subscribe(data => {
        let id = data.id;
        let name = data.name;
        let price = data.price;
        let stock = data.stock;
        let category = data.category
        this.form = new FormGroup({
          'id': new FormControl(id),
          'name': new FormControl(name),
          'price': new FormControl(price),
          'stock': new FormControl(stock),
          'category': new FormControl(category)
        });
      });
    }
  }

  operate() {
    this.product.id = this.form.value['id'];
    this.product.name = this.form.value['name'];
    this.product.price = this.form.value['price'];
    this.product.stock = this.form.value['stock'];
    this.product.category = this.form.value['category'];

    if (this.product != null && this.product.id > 0) {
      this.productService.update(this.product).pipe(switchMap(() => {
        return this.productService.list();
      })).subscribe(data => {
        this.productService.productChange.next(data);
        this.productService.msgChange.next("Se modificó");
      });

    } else {
      this.productService.save(this.product).subscribe(data => {
        this.productService.list().subscribe(product => {
          this.productService.productChange.next(product);
          this.productService.msgChange.next("Se registró");
        });
      });
    }

    this.router.navigate(['products']);
  }

  listCategories() {
    this.productCategoryService.list().subscribe(data => {
      this.categories = data;
    });
  }

}
