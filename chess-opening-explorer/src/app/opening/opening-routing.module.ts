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
      title: 'Browse',
    },
  },
  {
    path: 'catalog/search',
    component: OpeningCatalogComponent,
    data: {
      title: 'Search',
    },
  },
  {
    path: 'create',
    component: OpeningCreateComponent,
    canActivate: [AuthActivate],
    data: {
      title: 'Create',
      loginRequired: true,
    },
  },
  {
    path: 'edit/:id',
    component: OpeningEditComponent,
    canActivate: [AuthActivate],
    data: {
      title: 'Update',
      loginRequired: true,
    },
  },
  {
    path: 'delete/:id',
    component: OpeningDeleteComponent,
    canActivate: [AuthActivate],
    data: {
      title: 'Deleting Your Opening',
      loginRequired: true,
    },
  },
  {
    path: 'details/:id',
    component: OpeningDetailsComponent,
    data: {
      title: 'Details',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpeningRoutingModule {}
