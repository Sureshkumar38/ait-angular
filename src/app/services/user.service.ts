import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpLayerService } from './http-layer.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private httpLayerService: HttpLayerService,
    @Inject('API_URL') private apiUrl: string) { }

  public getUserLists(): any {
    return this.http.get(`https://reqres.in/api/users?page=2`);
  }

  public createUser(data: any): any {
    let param = {
      "Email": data.Email,
      "FirstName": data.FirstName,
      "ImageUrl": data.ImageUrl,
      "LastName": data.LastName
    }
    const url = `${this.apiUrl}/users`
    return this.httpLayerService.post(url, param).subscribe((data) => {
    });
  }

  public updateUserLists(data: any): any {
    let param = {
      "Email": data.Email,
      "FirstName": data.FirstName,
      "ImageUrl": data.ImageUrl,
      "LastName": data.LastName
    }
    const url = `${this.apiUrl}/users/2`
    return this.httpLayerService.put(url, param).subscribe((data) => {
    });
  }

  public deleteUserLists(param: any): any {
    const url = `${this.apiUrl}/users/2`
    return this.http.delete(url, param).subscribe((data) => {
    });
  }
}
