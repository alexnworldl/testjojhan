import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriasComponent } from './categorias.component';
import { LitsCategoriesComponent } from './lits-categories/lits-categories.component';

const routes: Routes = [{
  path:'',
  component: CategoriasComponent,
  children:[
    {
    path:'list',
    component:LitsCategoriesComponent,
  }
]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
