import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { User } from './user.model';
import { Observable, Subject } from 'rxjs';
import { HttpService } from './http.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  public refresh = new Subject<string>();
  public selectedUser: User = {
    FirstName: '',
    LastName: '',
    Email: '',
    Phone: '',
    Status: ''
  };

  public isAdmin = false;

  constructor(private http: HttpClient, private httpService: HttpService) { }

  refreshData() {
    this.refresh.next('refresh');
  }

  createUser(user: User): Observable<any> {
    return this.httpService.call(environment.apiBaseUrl, 'POST', user);
  }

  UpdateUserDetails(data) {
    return this.httpService.call(`${environment.apiBaseUrl}/${data.id}`, 'PUT', data);
  }

  getUserDetails(id): Observable<User> {
    return this.httpService.call(`${environment.apiBaseUrl}/${id}`, 'GET', '');
  }


  fetchAllUserProfile(): Observable<User[]> {
    return this.httpService.call(environment.apiBaseUrl, 'GET', '');
  }

  deleteUser(id): Observable<User> {
    return this.httpService.call(`${environment.apiBaseUrl}/${id}`, 'DELETE', '');
  }
}
