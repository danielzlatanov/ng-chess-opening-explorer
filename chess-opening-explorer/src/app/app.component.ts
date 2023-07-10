import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'chess-opening-explorer';

  constructor(private db: AngularFireDatabase) {}

  getAllData() {
    return this.db.list('/').valueChanges();
  }

  ngOnInit() {}
}
