import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { StationService } from 'src/app/services/station.service';
import { NgForm } from '@angular/forms';
import { Station } from 'src/app/models/Station';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss']
})
export class EditPage implements OnInit {
  station: Station;

  constructor(
    public service: StationService,
    public toast: ToastController,
    private activatedRoute: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const a = this.service.getStation(params.id).subscribe(res => {
        this.service.formData = res;
      });
    });
  }

  async showToast() {
    const toast = await this.toast.create({
      message: 'Your station have been updated successfully.',
      duration: 5000,
      position: 'top',
      showCloseButton: true
    });
    toast.present();
  }

  onSubmit(form: NgForm) {
    this.service.updateStation(form.value).subscribe(res => {
      this.showToast();
      console.log(res);
    });
  }
}
