import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivationStart, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'chess-opening-explorer';

  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    private pageTitle: Title
  ) {
    this.router.events
      .pipe(
        filter((e): e is ActivationStart => e instanceof ActivationStart),
        map((e) => e.snapshot.data?.['title']),
        filter((x) => Boolean(x))
      )
      .subscribe((newTitle) => {
        this.pageTitle.setTitle(newTitle);
      });
  }

  // getAllData() {
  //   return this.db.list('/').valueChanges();
  // }

  ngOnInit() {}
}
