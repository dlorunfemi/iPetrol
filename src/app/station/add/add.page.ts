import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { StationService } from 'src/app/services/station.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  constructor(
    private service: StationService,
    public toast: ToastController
  ) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
      this.service.formData = {
        id: 0,
        name: '',
        address: ''
      };
    }
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

  onSubmit(form: NgForm) {
    this.service.addStation(form.value).subscribe(res => {
      this.resetForm(form);
      this.showToast();
    });
  }

}
