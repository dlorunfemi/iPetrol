import { Injectable } from '@angular/core';
import { Tank } from '../models/Tank';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Station } from '../models/Station';

@Injectable({
  providedIn: 'root'
})
export class TankService {

  formData: Tank = new Tank();

  private listeners = new Subject<any>();

  readonly apiUrl = 'https://my-json-server.typicode.com/dormynion/iPetrol';

  constructor(private http: HttpClient) { }

  getTankList(): Observable<Tank[]> {
    return this.http.get<Tank[]>(this.apiUrl + '/tank');
  }

  addTank(tank: Tank) {
    return this.http.post(this.apiUrl + '/tank/', tank);
  }

  updateTank(tank: Tank) {
    return this.http.put(this.apiUrl + '/tank/', tank);
  }

  deleteTank(id: number) {
    return this.http.delete(this.apiUrl + '/tank/' + id);
  }

  getStation(): Observable<any> {
    return this.http.get<Station[]>(this.apiUrl + '/station');
  }

  listen(): Observable<any> {
    return this.listeners.asObservable();
  }

  filter(filterBy: string) {
    this.listeners.next(filterBy);
  }
}
