import { Component, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { AuthService } from 'src/app/auth/auth.service';
import { LoaderService } from 'src/app/shared/loader/loader.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: User | null = null;

  constructor(
    private authService: AuthService,
    private loaderService: LoaderService
  ) {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      this.loaderService.hideLoader();
    });
  }
  ngOnInit(): void {
    this.loaderService.showLoader();
  }
}
