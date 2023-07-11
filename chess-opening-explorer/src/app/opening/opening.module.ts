import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeningDetailsComponent } from './opening-details/opening-details.component';
import { OpeningRoutingModule } from './opening-routing.module';
import { OpeningCatalogComponent } from './opening-catalog/opening-catalog.component';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxChessBoardModule } from 'ngx-chess-board';
import { OpeningCreateComponent } from './opening-create/opening-create.component';
import { OpeningEditComponent } from './opening-edit/opening-edit.component';
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
    MatButtonModule,
    FontAwesomeModule,
    NgxChessBoardModule,
  ],
})
export class OpeningModule {}
