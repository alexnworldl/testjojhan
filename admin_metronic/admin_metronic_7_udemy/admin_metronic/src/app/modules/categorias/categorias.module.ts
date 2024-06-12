import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { CategoriasComponent } from './categorias.component';
import { AddNewCategorieComponent } from './add-new-categorie/add-new-categorie.component';
import { EditNewCategorieComponent } from './edit-new-categorie/edit-new-categorie.component';
import { DeleteNewCategorieComponent } from './delete-new-categorie/delete-new-categorie.component';
import { LitsCategoriesComponent } from './lits-categories/lits-categories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbModalModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';
import { CRUDTableModule } from 'src/app/_metronic/shared/crud-table';


@NgModule({
  declarations: [CategoriasComponent, AddNewCategorieComponent, EditNewCategorieComponent, DeleteNewCategorieComponent, LitsCategoriesComponent],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    //

    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    CRUDTableModule,
    NgbModalModule,
    NgbDatepickerModule,
  ]
})
export class CategoriasModule { }
