import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserViewComponent } from './user-view/user-view.component';
import { TeamViewComponent } from './team-view/team-view.component';
import { CompetitionViewComponent } from './competition-view/competition-view.component';

import { ViewTableComponent } from './view-table/view-table.component';
import { ManagementOptionsComponent } from './management-options/management-options.component';

import { StatusFieldComponent } from './status-field/status-field.component';
import { DateFieldComponent } from './date-field/date-field.component';
import { ImageFieldComponent } from './image-field/image-field.component';
import { CountryFieldComponent } from './country-field/country-field.component';
import { TeamFieldComponent } from './team-field/team-field.component';

import { FlexLayoutModule } from '@angular/flex-layout';

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


@NgModule({
  declarations: [
    UserViewComponent,
    TeamViewComponent,
    CompetitionViewComponent,
    CountryFieldComponent,
    TeamFieldComponent,
    ImageFieldComponent,
    StatusFieldComponent,
    DateFieldComponent,
    ViewTableComponent,
    ManagementOptionsComponent,
  ],
  exports: [
    UserViewComponent,
    TeamViewComponent,
    CompetitionViewComponent,
    CountryFieldComponent,
    ImageFieldComponent,
    StatusFieldComponent,
    TeamFieldComponent,
    DateFieldComponent,
    ViewTableComponent,
    ManagementOptionsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
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
  ]
})
export class ComponentsModule { }
