import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeningDetailsComponent } from './opening-details/opening-details.component';
import { OpeningRoutingModule } from './opening-routing.module';
import { OpeningCatalogComponent } from './opening-catalog/opening-catalog.component';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxChessBoardModule } from 'ngx-chess-board';

@NgModule({
  declarations: [OpeningDetailsComponent, OpeningCatalogComponent],
  imports: [
    CommonModule,
    OpeningRoutingModule,
    MatButtonModule,
    FontAwesomeModule,
    NgxChessBoardModule,
  ],
})
export class OpeningModule {}
