import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeningDetailsComponent } from './opening-details/opening-details.component';
import { OpeningRoutingModule } from './opening-routing.module';
import { OpeningCatalogComponent } from './opening-catalog/opening-catalog.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [OpeningDetailsComponent, OpeningCatalogComponent],
  imports: [CommonModule, OpeningRoutingModule,MatButtonModule],
})
export class OpeningModule {}
