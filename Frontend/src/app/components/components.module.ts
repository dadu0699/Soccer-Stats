import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { UserViewComponent } from './views/user-view/user-view.component';
import { TeamViewComponent } from './views/team-view/team-view.component';
import { CompetitionViewComponent } from './views/competition-view/competition-view.component';
import { GameViewComponent } from './views/game-view/game-view.component';
import { StadiumViewComponent } from './views/stadium-view/stadium-view.component';
import { PlayerViewComponent } from './views/player-view/player-view.component';
import { TechnicalDirectorViewComponent } from './views/technical-director-view/technical-director-view.component';

import { StatusFieldComponent } from './fields/status-field/status-field.component';
import { DateFieldComponent } from './fields/date-field/date-field.component';
import { ImageFieldComponent } from './fields/image-field/image-field.component';
import { CountryFieldComponent } from './fields/country-field/country-field.component';
import { TeamFieldComponent } from './fields/team-field/team-field.component';
import { StadiumFieldComponent } from './fields/stadium-field/stadium-field.component';
import { CompetitionFieldComponent } from './fields/competition-field/competition-field.component';
import { PlayerFieldComponent } from './fields/player-field/player-field.component';

import { ViewTableComponent } from './others/view-table/view-table.component';
import { ManagementOptionsComponent } from './others/management-options/management-options.component';
import { AccountManagementComponent } from './others/account-management/account-management.component';
import { UserRegisterFormComponent } from './others/user-register-form/user-register-form.component';

import { IncidenceDialogComponent } from './dialogs/incidence-dialog/incidence-dialog.component';
import { TransferDialogComponent } from './dialogs/transfer-dialog/transfer-dialog.component';
import { ForgotPasswordDialogComponent } from './dialogs/forgot-password-dialog/forgot-password-dialog.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    UserViewComponent,
    TeamViewComponent,
    CompetitionViewComponent,
    GameViewComponent,
    StadiumViewComponent,
    PlayerViewComponent,
    TechnicalDirectorViewComponent,
    CountryFieldComponent,
    TeamFieldComponent,
    ImageFieldComponent,
    StatusFieldComponent,
    DateFieldComponent,
    StadiumFieldComponent,
    CompetitionFieldComponent,
    ViewTableComponent,
    ManagementOptionsComponent,
    AccountManagementComponent,
    UserRegisterFormComponent,
    IncidenceDialogComponent,
    TransferDialogComponent,
    ForgotPasswordDialogComponent,
    PlayerFieldComponent,
  ],
  entryComponents: [
    IncidenceDialogComponent,
    TransferDialogComponent,
    ForgotPasswordDialogComponent,
  ],
  exports: [
    UserViewComponent,
    TeamViewComponent,
    CompetitionViewComponent,
    GameViewComponent,
    StadiumViewComponent,
    PlayerViewComponent,
    TechnicalDirectorViewComponent,
    CountryFieldComponent,
    ImageFieldComponent,
    StatusFieldComponent,
    TeamFieldComponent,
    DateFieldComponent,
    StadiumFieldComponent,
    CompetitionFieldComponent,
    ViewTableComponent,
    ManagementOptionsComponent,
    AccountManagementComponent,
    UserRegisterFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatRadioModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
  ]
})
export class ComponentsModule { }
