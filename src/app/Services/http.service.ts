import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }

  public call(url: string, type: string, data: any): Observable<any> {
    switch (type) {
      case 'GET':
        return this.http.get<any>(url + data);
      case 'POST':
        return this.http.post<any>(url, data);
      case 'PUT':
        return this.http.put<any>(url, data);
      case 'DELETE':
        return this.http.delete<any>(url, data);
    }
  }
}
