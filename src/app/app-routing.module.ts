import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './pages/client/client.component';
import { EditClientComponent } from './pages/client/edit-client/edit-client.component';
import { HomeComponent } from './pages/home/home.component';
import { EditProductComponent } from './pages/product/edit-product/edit-product.component';
import { ProductComponent } from './pages/product/product.component';

const routes: Routes = [
{
  path: 'products', component: ProductComponent, children: [
    { path: 'new', component: EditProductComponent },
    { path: 'edit/:id', component: EditProductComponent }
  ]
},
{
  path: 'clients', component: ClientComponent, children: [
    { path: 'new', component: EditClientComponent },
    { path: 'edit/:id', component: EditClientComponent }
  ]
},
{ path: 'home', component: HomeComponent },
{ path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
