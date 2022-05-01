import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { NotificacionService } from 'src/app/services/notification.service';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { CountryService } from 'src/app/services/country.service';
import { img } from 'src/app/img/img';
import { CustomerService } from 'src/app/services/customer.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-modal-profile',
  templateUrl: './modal-profile.component.html',
  styleUrls: ['./modal-profile.component.scss'],
})
export class ModalProfileComponent implements OnInit {
  public disabledBtn: boolean = false;
  public passwordType: string = 'password';
  public passwordShow: boolean = false;
  public countries = [];
  public data: User = new User();
  public genders = [
    { id: 1, description: 'Male', char: 'M' },
    { id: 2, description: 'Female', char: 'F' },
    { id: 3, description: 'Other', char: 'U' },
  ];

  constructor(
    private modalController: ModalController,
    private camera: Camera,
    private authService: AuthService,
    private notificacionService: NotificacionService,
    private countryService: CountryService,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.getUser();
    this.getAllCountries()
  }

  //CERRAR MODAL
  closeModal() {
    this.modalController.dismiss();
  }

  /**
   * Obtener usuario
   */
  getUser() {
    this.customerService.getProfile()
      .then((res) => {
        console.log(res)
        this.data = res.data[0];
        this.data.birth_date = this.data.birth_date.split('T')[0];
      })
      .catch((err) => {
        this.notificacionService.presentToast('An error has ocurred, please try again.');
      });
  }


  //TOGGLE PASSWORD
  togglePassword() {
    if (this.passwordShow) {
      this.passwordShow = false;
      this.passwordType = 'password';
    } else {
      this.passwordShow = true;
      this.passwordType = 'text';
    }
  }

  saveChanges() {
    this.data.photo = this.returnImage(this.data.photo);
    if (this.validarCampos()) {
      this.disabledBtn = true;
      this.update();
    }
  }

  validarCampos(): boolean {
    if (this.data.name === '' || this.data.name === undefined) {
      this.notificacionService.presentToast('Name is required.');
      return false;
    }
    if (this.data.lastname === '' || this.data.lastname === undefined) {
      this.notificacionService.presentToast('Last Name is required.');
      return false;
    }
    if (this.data.email === '' || this.data.email === undefined) {
      this.notificacionService.presentToast('Email is required.');
      return false;
    }
    if (this.data.phone === '' || this.data.phone === undefined) {
      this.notificacionService.presentToast('Phone is required.');
      return false;
    }
    if (this.data.address === '' || this.data.address === undefined) {
      this.notificacionService.presentToast('Address is required.');
      return false;
    }
    if (this.data.gender === '' || this.data.gender === undefined) {
      this.notificacionService.presentToast('Gender is required.');
      return false;
    }
    return true;
  }

  /**
 * Obtener todos los paises
 */
  getAllCountries = () => {
    this.countryService.get()
      .then((res) => {
        console.log(res)
        this.countries = [];
        this.countries = res.data;
      });
  }

  /**
   * Crear usuario
   */
  public update() {
    console.log(this.data)
    this.data.birth_date = this.data.birth_date.split('T')[0];
    this.customerService.updateProfile(this.data)
      .then((res) => {
        this.disabledBtn = false;
        this.closeModal();
        this.notificacionService.presentAlert('Updated', 'Your user has successfully updated.');
      })
      .catch((err) => {
        this.disabledBtn = false;
        this.notificacionService.presentToast('Error updating user, please try again.');
      });
  }

  /**
   * Obtener foto
   */
  libreria() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    this.procesarImagen(options);
  }

  procesarImagen(options: CameraOptions) {
    this.camera.getPicture(options).then((imageData) => {
      this.data.photo = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      this.notificacionService.presentToast('Sorry, service disabled for your device.');
    });
  }

  returnImage(image: string) {
    if (image.includes('https')) {
      return ''
    }
    return image;
  }

}
