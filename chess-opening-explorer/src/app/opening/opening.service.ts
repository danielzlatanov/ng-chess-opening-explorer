import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { IOpening } from '../shared/interfaces/opening';

@Injectable({
  providedIn: 'root',
})
export class OpeningService {
  constructor(private afDatabase: AngularFireDatabase) {}

  createOpening(opening: IOpening): Promise<void> {
    const openingsRef: AngularFireList<IOpening> =
      this.afDatabase.list<IOpening>('openings');

    return new Promise<void>((resolve, reject) => {
      openingsRef
        .push(opening)
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  }
}
