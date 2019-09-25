import { Component, OnInit } from '@angular/core';
import { StationService } from 'src/app/services/station.service';
import { Station } from 'src/app/models/Station';
import { Observable } from 'rxjs';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class ShowPage implements OnInit {
  station: Station[];

  constructor(
    private service: StationService,
    private router: Router,
    private alert: AlertController,
    private toast: ToastController

  ) {
    this.service.listen().subscribe((m: any) => {
      // console.log(m);
      this.refreshStationList();
    });
   }

  ngOnInit() {
    this.refreshStationList();
  }

  refreshStationList() {
    this.service.getStationList().subscribe(data => {
      return this.station = data;
    });
  }

  async showToast() {
    const toast = await this.toast.create({
      message: 'Your station have been added successfully.',
      duration: 5000,
      position: 'top',
      showCloseButton: true
    });
    toast.present();
  }

  onDeleteStation(id: number) {
    this.alert.create({
      header: 'Are you sure',
      message: 'Do you really want to delete this station',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.service.deleteStation(id).subscribe(res => {
              this.refreshStationList();
              this.showToast();
            });
            this.router.navigate(['/station']);
          }
        }
      ]
    }).then(al => {
      al.present();
    });
  }
}
