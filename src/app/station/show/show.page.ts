import { Component, OnInit } from '@angular/core';
import { StationService } from 'src/app/services/station.service';
import { Station } from 'src/app/models/Station';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class ShowPage implements OnInit {
  station: Observable<Station[]>;

  constructor(
    private service: StationService
  ) { }

  ngOnInit() {
    this.refreshStationList();
  }

  refreshStationList() {
    this.station = this.service.getStationList();
  }

}
