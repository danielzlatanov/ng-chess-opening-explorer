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

  getOpeningById(id: string): Promise<IOpening> {
    return new Promise<IOpening>((resolve, reject) => {
      this.openingsRef.query
        .orderByKey()
        .equalTo(id)
        .once('value')
        .then((snapshot) => {
          const openingSnapshot = snapshot.val();

          if (openingSnapshot) {
            const openingId = Object.keys(openingSnapshot)[0];
            const opening = openingSnapshot[openingId];
            resolve({ id: openingId, ...opening });
          } else {
            reject(new Error(`Opening could not be found`));
          }
        })
        .catch((error) => reject(error));
    });
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
