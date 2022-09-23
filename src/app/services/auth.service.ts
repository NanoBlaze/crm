import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, UserCredential } from '@angular/fire/auth';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private auth: Auth) { }

  login(user: User): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, user.email, user.password)
  }

  register(user: User){
    return createUserWithEmailAndPassword(this.auth, user.email, user.password)
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider())
  }

  logout(): Promise<void>{
    return this.auth.signOut()
  }

  getSessionData(key: string) {
    return sessionStorage.getItem(key) as string;
  }

  setSessionData(key: string, value: string):void{
    return sessionStorage.setItem(key, value);
  }
}
