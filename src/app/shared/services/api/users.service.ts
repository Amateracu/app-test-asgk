import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { TOKEN } from '../../constants/token.const';
import { ISendPush } from '../../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class UsersService {
  public endPoints = {
    usersHttp: 'v1',
  };

  constructor(private http: HttpClient) {}

  public getAllUsers(): Observable<any> {
    const token = localStorage.getItem(TOKEN);
    const url =
      environment.apiUrl +
      this.endPoints.usersHttp +
      '/' +
      token +
      '/passes?&limit=100&offset=0';
    return this.http.get(url);
  }

  public sendPushMessage(message: ISendPush): Observable<any> {
    const token = localStorage.getItem(TOKEN);
    const url =
      environment.apiUrl +
      this.endPoints.usersHttp +
      '/' +
      token +
      '/message/push';
    return this.http.post(url, message);
  }
}
