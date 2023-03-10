import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddScreeningHallComponent } from './add-screening-hall/add-screening-hall.component';
import { ScreeningHallsListComponent } from './screening-halls-list/screening-halls-list.component';
import { StoreModule } from '@ngrx/store';
import { screeningHallsFeatureKey } from './store/screening-halls.state';
import { screeningHallsReducer } from './store/screening-halls.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ScreeningHallsEffects } from './store/screening-halls.effects';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AddScreeningHallComponent, ScreeningHallsListComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    StoreModule.forFeature(screeningHallsFeatureKey, screeningHallsReducer),
    EffectsModule.forFeature([ScreeningHallsEffects]),
    RouterModule.forChild([
      { path: '', redirectTo: 'screening-halls-list', pathMatch: 'full' },
      {
        path: 'add-screening-hall',
        component: AddScreeningHallComponent,
      },
      {
        path: 'screening-halls-list',
        component: ScreeningHallsListComponent,
      },
    ]),
  ],
})
export default class ScreeningHallsModule {}
