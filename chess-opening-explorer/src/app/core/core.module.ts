import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';
import { OpeningNotFoundComponent } from './components/opening-not-found/opening-not-found.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PageNotFoundComponent,
    OpeningNotFoundComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    FontAwesomeModule,
  ],
  exports: [HeaderComponent, FooterComponent, HomeComponent],
})
export class CoreModule {}
