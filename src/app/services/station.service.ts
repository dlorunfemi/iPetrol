import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Station } from '../models/Station';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StationService {
  formData: Station = new Station();

  sta: Observable<Station[]>;

  private listeners = new Subject<any>();

  readonly apiUrl = 'https://my-json-server.typicode.com/dormynion/iPetrol';

  constructor(private http: HttpClient) {}

  getStationList(): Observable<Station[]> {
    return this.http.get<Station[]>(this.apiUrl + '/station');
  }

  getStation(id: number) {
    return this.http.get<Station[]>(this.apiUrl + '/station/' + id);
    // this.sta = this.getStationList();
    // return {
    //   ...this.sta.subscribe(station => {
    //     return station.id === id;
    //   })
    // };
  }

  addStation(station: Station) {
    return this.http.post(this.apiUrl + '/station/', station);
  }

  updateStation(station: Station) {
    return this.http.put(this.apiUrl + '/station/', station);
  }

  deleteStation(id: number) {
    return this.http.delete(this.apiUrl + '/station/' + id);
  }

  listen(): Observable<any> {
    return this.listeners.asObservable();
  }

  filter(filterBy: string) {
    this.listeners.next(filterBy);
  }

}
