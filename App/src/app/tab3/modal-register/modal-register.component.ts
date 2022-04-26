import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-register',
  templateUrl: './modal-register.component.html',
  styleUrls: ['./modal-register.component.scss'],
})
export class ModalRegisterComponent implements OnInit {
  public disabledBtn: boolean = false;
  public passwordType: string = 'password';
  public passwordShow: boolean = false;
  public passwordType2: string = 'password';
  public passwordShow2: boolean = false;
  data = {
    nickname: '',
    correo: '',
    password: '',
    imagen: '',
    fechaNacimiento: '',
    passwordRepeat: '',
    nombre: '',
    apellido: '',
    telefono: '',
    tipoUsuario: 2,
    estado: 1,
    notificacionPush: ''
  }

  constructor(
    private modalController: ModalController,
    //private notificacionService: any,
    //private usuarioService: UsuarioService
  ) { }

  ngOnInit() { }

  //CERRAR MODAL
  closeModal() {
    this.modalController.dismiss();
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

  //TOGGLE PASSWORD
  togglePassword2() {
    if (this.passwordShow2) {
      this.passwordShow2 = false;
      this.passwordType2 = 'password';
    } else {
      this.passwordShow2 = true;
      this.passwordType2 = 'text';
    }
  }

  saveChanges() {
    if (this.validarCampos()) {
      this.disabledBtn = true;
      this.create();
    }
  }

  validarCampos(): boolean {
    // if (this.data.nickname) {
    //   if (this.data.correo) {
    //     if (this.data.password) {
    //       if (this.data.passwordRepeat) {
    //         if (this.data.nombre) {
    //           if (this.data.apellido) {
    //             if (this.data.telefono) {
    //               if (/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,50}$/.test(this.data.password)) {
    //                 if (this.data.password == this.data.passwordRepeat) {
    //                   return true;
    //                 } else {
    //                   this.notificacionService.presentToast('Las contraseñas no son iguales.')
    //                 }
    //               } else {
    //                 this.notificacionService.presentAlert('Contraseña Inválida', 'Debe de tener mínimo 8 caracteres, al menos una minúscula, al menos una mayúscula al menos un dígito.');
    //               }
    //             } else {
    //               this.notificacionService.presentToast('El telefono es requerido.')
    //             }
    //           } else {
    //             this.notificacionService.presentToast('El apellido es requerido.')
    //           }
    //         } else {
    //           this.notificacionService.presentToast('El nombre es requerido.')
    //         }
    //       } else {
    //         this.notificacionService.presentToast('La contraseña repetida es requerida.')
    //       }
    //     } else {
    //       this.notificacionService.presentToast('La contraseña es requerida.')
    //     }
    //   } else {
    //     this.notificacionService.presentToast('El correo es requerido.')
    //   }
    // } else {
    //   this.notificacionService.presentToast('El nombre de usuario es requerido.')
    // }
    return false;
  }

  public create() {
    // console.log(this.data)
    // this.data.fechaNacimiento = this.data.fechaNacimiento.split('T')[0];
    // this.usuarioService.create(this.data)
    //   .subscribe((res) => {
    //     this.closeModal();
    //     this.notificacionService.presentAlert('Registro', 'Tu usuario se ha registrado exitosamente.');
    //   }, (err) => {
    //     console.error(err);
    //     this.disabledBtn = false;
    //     if (err.status == '400') {
    //       this.notificacionService.presentToast('El nombre de usuario o correo electrónico ya existe.');
    //     }
    //   });
  }

}