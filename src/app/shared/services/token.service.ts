import { Injectable } from '@angular/core';
import { EXP_TOKEN, TOKEN } from '../constants/token.const';

@Injectable({ providedIn: 'root' })
export class TokenService {
  public getToken(): string | null {
    return localStorage.getItem(TOKEN);
  }

  public tokenIsExpired(): boolean {
    const expDate = new Date(localStorage.getItem(EXP_TOKEN) as string);
    const currentDate = new Date();
    return currentDate > expDate;
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  public setToken(token: string): void {
    if (token) {
      localStorage.setItem(TOKEN, token);
    } else {
      localStorage.clear;
    }
  }
}
