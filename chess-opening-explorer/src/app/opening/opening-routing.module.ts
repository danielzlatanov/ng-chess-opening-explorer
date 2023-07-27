import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpeningCatalogComponent } from './opening-catalog/opening-catalog.component';
import { OpeningDetailsComponent } from './opening-details/opening-details.component';
import { OpeningCreateComponent } from './opening-create/opening-create.component';
import { OpeningEditComponent } from './opening-edit/opening-edit.component';
import { OpeningDeleteComponent } from './opening-delete/opening-delete.component';
import { AuthActivate } from '../core/guards/auth.guard';

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
    canActivate: [AuthActivate],
    data: {
      title: 'Create Opening',
      loginRequired: true,
    },
  },
  {
    path: 'edit/:id',
    component: OpeningEditComponent,
    canActivate: [AuthActivate],
    data: {
      title: 'Update Opening',
      loginRequired: true,
    },
  },
  {
    path: 'delete/:id',
    component: OpeningDeleteComponent,
    canActivate: [AuthActivate],
    data: {
      title: 'Delete Opening',
      loginRequired: true,
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
