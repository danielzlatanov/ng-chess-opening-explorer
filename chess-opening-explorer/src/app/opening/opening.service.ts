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
  private openingsRef: AngularFireList<IOpening>;

  constructor(private afDatabase: AngularFireDatabase) {
    this.openingsRef = this.afDatabase.list<IOpening>('openings');
  }

  private fetchOpenings(limitQuery?: boolean): Promise<IOpening[]> {
    let modifiedRef = limitQuery
      ? this.openingsRef.query.orderByKey().limitToLast(3)
      : this.openingsRef.query;

    return new Promise<IOpening[]>((resolve, reject) => {
      modifiedRef
        .once('value')
        .then((snapshot) => {
          const openings: IOpening[] = [];

          snapshot.forEach((childSnapshot) => {
            const opening = childSnapshot.val();
            const id = childSnapshot.key;
            openings.push({ id, ...opening });
          });

          resolve(openings);
        })
        .catch((error) => reject(error));
    });
  }

  async getAllOpenings(): Promise<IOpening[]> {
    return this.fetchOpenings();
  }

  getLastThreeOpenings(): Promise<IOpening[]> {
    return this.fetchOpenings(true);
  }

  createOpening(opening: IOpening): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.openingsRef
        .push(opening)
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  }
}
