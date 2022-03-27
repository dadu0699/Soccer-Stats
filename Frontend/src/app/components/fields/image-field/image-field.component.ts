import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-image-field',
  templateUrl: './image-field.component.html',
  styleUrls: ['./image-field.component.css']
})
export class ImageFieldComponent implements OnInit {

  @Input('uploadedPhoto') uploadedPhoto: string;
  @Input('existingPhoto') existingPhoto!: string;

  @Output('selectPicture') selectPicture: EventEmitter<string>;

  public myForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private _snackBar: MatSnackBar,
  ) {
    this.myForm = this.fb.group({
      img: [null],
    });
    this.uploadedPhoto = '';
    this.selectPicture = new EventEmitter<string>();
  }

  ngOnInit(): void {
  }

  public onFileSelected(event: any) {
    try {
      const file = (event.target as HTMLInputElement).files![0];
      if (file) {
        var temporal: string[] = file.name.split('.');
        var extension = temporal[1].toLocaleLowerCase();
        let extensiones = ['jpg', 'png', 'jpeg'];
        if (extensiones.indexOf(extension) == -1) {
          throw new Error();
        } else {
          this.convert64(file);
          this.myForm.patchValue({
            img: file,
          });

          this.myForm.get('img')?.updateValueAndValidity();
          const reader = new FileReader();
          reader.onload = () => {
            this.uploadedPhoto = reader.result as string;
          };
          reader.readAsDataURL(file);
        }
      }
    } catch (error) {
      this.showSnackbar('Extension not allowed :o');
    }
  }

  private convert64(photo: any) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const base64 = e.target.result;
      this.selectPicture.emit(base64);
    };
    reader.readAsDataURL(photo);
  }

  showSnackbar(message: string = 'Something went wrong :c') {
    this._snackBar.open(message, 'CLOSE', { duration: 5000 });
  }

}
