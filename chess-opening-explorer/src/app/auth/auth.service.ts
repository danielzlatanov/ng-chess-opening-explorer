import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User | null = null;

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((user) => {
      (this.user as any) = user;
    });
  }

  async register(email: string, password: string): Promise<void> {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      (this.user as any) = userCredential.user;
    } catch (err: any) {
      if (err.code === 'auth/weak-password') {
        return alert(
          'Password is too weak. Please choose a stronger password.'
        );
      } else if (err.code == 'auth/invalid-email') {
        return alert('Email is invalid.');
      } else if (err.code == 'auth/email-already-in-use') {
        return alert('Email is already in use.');
      } else {
        return alert(
          'An error occurred during registration. Please try again later.'
        );
      }
    }
  }

  async login(email: string, password: string): Promise<void> {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      (this.user as any) = userCredential.user;
    } catch (error: any) {
      alert(error.message);
      console.error(error);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      this.user = null;
    } catch (error) {
      console.error(error);
    }
  }

  isAuthenticated(): boolean {
    return Boolean(this.afAuth.currentUser);
  }

  async getUser(): Promise<any> {
    return await this.afAuth.currentUser;
  }
}
