import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { User } from './user.model';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

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

  constructor(private http: HttpClient, private storage: StorageService) {

  }

  refreshData() {
    this.refresh.next('refresh');
  }
  postUser(user: User): Observable<any> {
    return this.http.post<any>('http://localhost:3000/profile/', user);
  }

  UpdateUserDetails(data) {
    return this.http.put<any>(`http://localhost:3000/profile/${data.id}`, data);
  }

  deleteToken() {
    this.storage.FlushAll();
  }

  getUserDetails(id): Observable<User> {
    return this.http.get<User>('http://localhost:3000/profile/id');
  }


  fetchAllUserProfile(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/profile');
  }

  deleteUser(id): Observable<User> {
    return this.http.delete<User>(`http://localhost:3000/profile/${id}`);
  }
}
