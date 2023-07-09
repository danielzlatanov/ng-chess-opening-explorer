import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeningDetailsComponent } from './opening-details/opening-details.component';
import { OpeningRoutingModule } from './opening-routing.module';
import { OpeningCatalogComponent } from './opening-catalog/opening-catalog.component';

@NgModule({
  declarations: [OpeningDetailsComponent, OpeningCatalogComponent],
  imports: [CommonModule, OpeningRoutingModule],
})
export class OpeningModule {}
