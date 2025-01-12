import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/pages/apps/user/user.model';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  private apiUrl = environment.backEndUrl;
  constructor(private http: HttpClient) {}
  private data = '/users/';
  index() {
    return this.http.get(`${this.apiUrl}${this.data}`);
  }

  profile() {
    return this.http.get(`${this.apiUrl}/profile`);
  }
  store(body: string) {
    return this.http.post(`${this.apiUrl}${this.data}`, body);
  }
  show(id: any) {
    const url = `${this.apiUrl}${this.data}${id}`;
    return this.http.get(url);
  }
  update(body: any) {
    const id = body.id;
    return this.http.put(`${this.apiUrl}${this.data}${id}`, body);
  }
  delete(id: number) {
    const url = `${this.apiUrl}${this.data}${id}`;
    return this.http.delete(url);
  }

  getAll() {
    return this.http.get<User[]>(`api/users`);
  }

  /***
   * Facked User Register
   */
  register(user: User) {
    return this.http.post(`/users/register`, user);
  }
}
