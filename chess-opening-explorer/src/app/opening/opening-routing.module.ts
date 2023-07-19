import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpeningCatalogComponent } from './opening-catalog/opening-catalog.component';
import { OpeningDetailsComponent } from './opening-details/opening-details.component';
import { OpeningCreateComponent } from './opening-create/opening-create.component';
import { OpeningEditComponent } from './opening-edit/opening-edit.component';
import { OpeningDeleteComponent } from './opening-delete/opening-delete.component';

const routes: Routes = [
  {
    path: 'catalog',
    component: OpeningCatalogComponent,
    data: {
      title: 'Browse Openings',
    },
  },
  {
    path: 'catalog/search',
    component: OpeningCatalogComponent,
    data: {
      title: 'Search Query',
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
    path: 'edit/:id',
    component: OpeningEditComponent,
    data: {
      title: 'Update Opening',
    },
  },
  {
    path: 'delete/:id',
    component: OpeningDeleteComponent,
    data: {
      title: 'Delete Opening',
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
