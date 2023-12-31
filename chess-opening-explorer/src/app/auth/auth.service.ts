import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'firebase/auth';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  subscription: Subscription;
  private isInitialized: boolean = false;
  private userSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.userSubject.asObservable();

  get isLoggedIn(): boolean {
    return this.userSubject.value !== null;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    return new Promise<void>((resolve, reject) => {
      this.subscription = this.afAuth.authState.subscribe({
        next: (user) => {
          this.userSubject.next(user as User);
          this.isInitialized = true;
          resolve();
        },
        error: (err) => {
          console.error(
            'Error occurred while listening to authState:',
            err.message
          );
          this.userSubject.next(null);
          this.isInitialized = true;
          reject(err);
        },
      });
    });
  }

  constructor(private afAuth: AngularFireAuth) {
    this.subscription = this.afAuth.authState.subscribe({
      next: (user) => {
        return this.userSubject.next(user as User);
      },
      error: (err) => {
        console.error(
          'Error occurred while listening to authState:',
          err.message
        );
        return this.userSubject.next(null);
      },
    });
  }

  async register(email: string, password: string): Promise<void> {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      return this.userSubject.next(userCredential.user as User);
    } catch (err: any) {
      const errMsg = this.getErrorMessageFromErrorCode(err.code);
      throw new Error(errMsg);
    }
  }

  async login(email: string, password: string): Promise<void> {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      return this.userSubject.next(userCredential.user as User);
    } catch (err: any) {
      const errMsg = this.getErrorMessageFromErrorCode(err.code);
      throw new Error(errMsg);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      return this.userSubject.next(null);
    } catch (err: any) {
      console.error('logout err: ', err.message);
      return this.userSubject.next(null);
    }
  }

  getErrorMessageFromErrorCode(errorCode: string): string {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'User not found. Please check your email or password.';
      case 'auth/wrong-password':
        return 'Incorrect email or password. Please try again.';
      case 'auth/email-already-in-use':
        return 'Email is already registered. Please use a different email.';
      case 'auth/invalid-email':
        return 'Invalid email format. Please enter a valid email address.';
      case 'auth/weak-password':
        return 'Weak password. Please choose a stronger password.';
      case 'auth/too-many-requests':
        return 'Too many unsuccessful attempts. Please try again later.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your internet connection.';
      case 'auth/user-disabled':
        return 'Your account has been disabled. Please contact support for assistance or try again later.';

      default:
        return 'An error occurred during authentication. Please try again later.';
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
