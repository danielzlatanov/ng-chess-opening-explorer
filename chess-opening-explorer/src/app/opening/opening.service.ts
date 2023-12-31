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

  async updateOpening(
    openingId: string,
    updatedOpening: IOpening
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.openingsRef
        .update(openingId, updatedOpening)
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  }

  deleteOpening(openingId: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.openingsRef
        .remove(openingId)
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  }

  async setOpeningAsExplored(
    openingId: string,
    userEmail: string
  ): Promise<void> {
    if (!userEmail) {
      return Promise.reject('User email not available');
    }

    const emailKey = userEmail.split('@')[0];
    const exploredOpeningsRef = this.afDatabase.object(
      `openings/${openingId}/exploredBy/${emailKey}`
    );

    try {
      await exploredOpeningsRef.set(true);
    } catch (error: any) {
      console.error('Error setting opening as explored: ', error.message);
      throw new Error('Failed to set opening as explored.');
    }
  }

  async getUserExploredOpenings(userEmail: string): Promise<IOpening[]> {
    const emailKey = userEmail.split('@')[0];
    try {
      const openings = await this.getAllOpenings();
      const userExploredOpenings = openings.filter(
        (opening) => opening.exploredBy && opening.exploredBy[emailKey]
      );

      return userExploredOpenings;
    } catch (error: any) {
      console.error('Error fetching user explored openings: ', error.message);
      throw new Error('Error fetching user explored openings.');
    }
  }

  async setOpeningAsFavourited(
    openingId: string,
    userEmail: string
  ): Promise<void> {
    if (!userEmail) {
      return Promise.reject('User email not available');
    }

    const emailKey = userEmail.split('@')[0];
    const favOpeningsRef = this.afDatabase.object(
      `openings/${openingId}/favouritedBy/${emailKey}`
    );

    try {
      await favOpeningsRef.set(true);
    } catch (error: any) {
      console.error('Error setting opening as favourited: ', error.message);
      throw new Error('Failed to set opening as favourited.');
    }
  }

  async setOpeningAsUnfavourited(
    openingId: string,
    userEmail: string
  ): Promise<void> {
    if (!userEmail) {
      return Promise.reject('User email not available');
    }

    const emailKey = userEmail.split('@')[0];
    const favOpeningsRef = this.afDatabase.object(
      `openings/${openingId}/favouritedBy/${emailKey}`
    );

    try {
      await favOpeningsRef.remove();
    } catch (error: any) {
      console.error('Error removing opening from favourites: ', error.message);
      throw new Error('Failed to remove opening from favourites.');
    }
  }

  async checkFavouriteStatus(
    openingId: string,
    userEmail: string
  ): Promise<boolean> {
    const emailKey = userEmail.split('@')[0];
    try {
      const openings = await this.getAllOpenings();
      const isFavourite = openings.some(
        (opening) =>
          opening.id === openingId && opening.favouritedBy?.[emailKey] === true
      );
      return isFavourite;
    } catch (error: any) {
      console.error('Error checking favourite status: ', error.message);
      throw new Error('Failed to check favourite status.');
    }
  }

  async getUserFavOpenings(userEmail: string): Promise<IOpening[]> {
    const emailKey = userEmail.split('@')[0];
    try {
      const openings = await this.getAllOpenings();
      const userFavOpenings = openings.filter(
        (opening) => opening.favouritedBy && opening.favouritedBy[emailKey]
      );
      return userFavOpenings;
    } catch (error: any) {
      console.error('Error fetching user favourite openings: ', error.message);
      throw new Error('Failed to fetch user favourite openings.');
    }
  }

  async getUserOwnOpenings(userId: string): Promise<IOpening[]> {
    try {
      const openings = await this.getAllOpenings();
      const userOwnOpenings = openings.filter(
        (opening) => opening.ownerId === userId
      );
      return userOwnOpenings;
    } catch (error: any) {
      console.error('Error fetching user own openings: ', error.message);
      throw new Error('Failed to fetch user own openings.');
    }
  }
}
