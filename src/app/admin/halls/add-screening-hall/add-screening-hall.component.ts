import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ScreeningHall } from '../screening-halls-api-service';
import { ScreeningHallsActions } from '../store/screening-halls.actions';

type ScreeningHallForm = FormGroup<{
  name: FormControl<string>;
  rows: FormControl<number | null>;
  columns: FormControl<number | null>;
}>;

@Component({
  selector: 'app-add-hall',
  templateUrl: './add-screening-hall.component.html',
  styles: [
    `
      :host {
        padding-top: 120px;
      }
      form {
        display: flex;
        flex-direction: column;
        min-width: min(500px, 80vw);
        max-width: 800px;
        margin: 1rem auto 0;
        background-color: #0d4a80;
        padding: 1rem;
        border-radius: 10px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddScreeningHallComponent {
  private builder = inject(NonNullableFormBuilder);
  private store = inject(Store);

  get nameCtrl() {
    return this.addScreeningHallForm.controls.name;
  }
  get rowsCtrl() {
    return this.addScreeningHallForm.controls.rows;
  }
  get columnsCtrl() {
    return this.addScreeningHallForm.controls.columns;
  }

  addScreeningHallForm = this.createMovieForm();

  private createMovieForm(): ScreeningHallForm {
    const form = this.builder.group({
      name: this.builder.control('', {
        validators: [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      }),
      rows: this.builder.control(null as number | null , {
        validators: [
          Validators.required,
          Validators.min(5),
          Validators.max(3000),
        ],
      }),
      columns: this.builder.control(null as number | null, {
        validators: [
          Validators.required,
          Validators.min(5),
          Validators.max(3000),
        ],
      }),
    });
    return form;
  }

  onSubmit() {
    this.addScreeningHallForm.markAllAsTouched();
    if (this.addScreeningHallForm.valid && ((this.rowsCtrl.value && this.columnsCtrl.value) !== null)) {
      const screeningHall: Partial<Omit<ScreeningHall, 'id'>> = {
        name: this.addScreeningHallForm.getRawValue().name,
        rows: <number>this.addScreeningHallForm.getRawValue().rows,
        columns: <number>this.addScreeningHallForm.getRawValue().columns,
      }
      this.store.dispatch(
        ScreeningHallsActions.addNewScreeningHall(screeningHall)
      );
    }
  }
}
