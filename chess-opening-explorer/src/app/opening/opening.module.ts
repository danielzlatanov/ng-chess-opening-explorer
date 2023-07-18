import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeningRoutingModule } from './opening-routing.module';
import { OpeningDetailsComponent } from './opening-details/opening-details.component';
import { OpeningCatalogComponent } from './opening-catalog/opening-catalog.component';
import { OpeningCreateComponent } from './opening-create/opening-create.component';
import { OpeningEditComponent } from './opening-edit/opening-edit.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';
import { OpeningDeleteComponent } from './opening-delete/opening-delete.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    OpeningDetailsComponent,
    OpeningCatalogComponent,
    OpeningCreateComponent,
    OpeningEditComponent,
    OpeningDeleteComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    OpeningRoutingModule,
    FontAwesomeModule,
    FormsModule
  ],
})
export class OpeningModule {}
