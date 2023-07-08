import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpeningListComponent } from './opening-list/opening-list.component';
import { OpeningDetailsComponent } from './opening-details/opening-details.component';
import { OpeningRoutingModule } from './opening-routing.module';



@NgModule({
  declarations: [
    OpeningListComponent,
    OpeningDetailsComponent
  ],
  imports: [
    CommonModule,
    OpeningRoutingModule
  ]
})
export class OpeningModule { }
