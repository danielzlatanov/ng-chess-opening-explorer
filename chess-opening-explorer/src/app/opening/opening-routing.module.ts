import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpeningCatalogComponent } from './opening-catalog/opening-catalog.component';
import { OpeningDetailsComponent } from './opening-details/opening-details.component';
import { OpeningCreateComponent } from './opening-create/opening-create.component';

const routes: Routes = [
  {
    path: 'catalog',
    component: OpeningCatalogComponent,
    data: {
      title: 'Browse Openings',
    },
  },
  {
    path: 'create',
    component: OpeningCreateComponent,
    data: {
      title: 'Create Opening',
    },
  },
  {
    path: 'details/:id',
    component: OpeningDetailsComponent,
    data: {
      title: 'Opening Explorer',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpeningRoutingModule {}
