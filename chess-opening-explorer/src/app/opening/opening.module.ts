import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeningRoutingModule } from './opening-routing.module';
import { OpeningDetailsComponent } from './opening-details/opening-details.component';
import { OpeningCatalogComponent } from './opening-catalog/opening-catalog.component';
import { OpeningCreateComponent } from './opening-create/opening-create.component';
import { OpeningEditComponent } from './opening-edit/opening-edit.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    OpeningDetailsComponent,
    OpeningCatalogComponent,
    OpeningCreateComponent,
    OpeningEditComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    OpeningRoutingModule,
    FontAwesomeModule,
  ],
})
export class OpeningModule {}
