import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { OpeningNotFoundComponent } from './core/components/opening-not-found/opening-not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    data: {
      title: 'Home Page',
    },
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
    data: {
      title: 'Page Not Found',
    },
  },
  {
    path: 'opening-not-found',
    component: OpeningNotFoundComponent,
    data: {
      title: 'Opening Not Found',
    },
  },
  {
    path: 'openings',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'openings',
    loadChildren: () =>
      import('./opening/opening.module').then((m) => m.OpeningModule),
  },
  {
    path: '**',
    redirectTo: 'page-not-found',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
