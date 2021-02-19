import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SearchBarComponent } from './pages/search-bar/search-bar.component';
import { ShowcaseComponent } from './pages/showcase/showcase.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductThumbnailComponent } from './pages/product-thumbnail/product-thumbnail.component';
import { CartService } from './services/cart.service';
import { ProductService } from './services/product.service';
import { ProductCategoryService } from './services/product.category.service';
import { ProductComponent } from './pages/product/product.component';
import { ClientComponent } from './pages/client/client.component';
import { EditClientComponent } from './pages/client/edit-client/edit-client.component';
import { EditProductComponent } from './pages/product/edit-product/edit-product.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchBarComponent,
    ShowcaseComponent,
    CartComponent,
    ProductThumbnailComponent,
    ProductComponent,
    ClientComponent,
    EditClientComponent,
    EditProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    ProductService,
    CartService,
    ProductCategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
