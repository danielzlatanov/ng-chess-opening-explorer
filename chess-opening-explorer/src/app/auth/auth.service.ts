import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  async register(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.createUserWithEmailAndPassword(email, password);
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
      await this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (error: any) {
      alert(error.message);
      console.error(error);
    }
  }
}
