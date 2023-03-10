/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, throwError } from 'rxjs';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { ScreeningHallsActions, ScreeningHallsAPIActions } from './screening-halls.actions';
import { ScreeningHallsApiService } from './../screening-halls-api-service';

@Injectable()
export class ScreeningHallsEffects {
  private actions$ = inject(Actions);
  private screeningHallsApiService = inject(ScreeningHallsApiService);
  private router = inject(Router);
  private snackBarService = inject(SnackBarService);

  addScreeningHallEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ScreeningHallsActions.addNewScreeningHall),
      exhaustMap((action) =>
        this.screeningHallsApiService.add(action).pipe(
          catchError((error) => {
            this.snackBarService.openSnackBar(
              'Akcja nie powiodła sie, spróbuj ponownie później',
              3000
            );
            return throwError(() => new Error(error));
          })
        )
      ),
      map((screeningHall) => {
        this.snackBarService.openSnackBar(
          'Salę pomyślnie dodano do bazy',
          5000,
          ['green-snackbar']
        );
        this.router.navigate(['admin/screening-halls/screening-halls-list']);
        return ScreeningHallsAPIActions.addNewScreeningHallSuccess(screeningHall);
      })
    );
  });

  getScreeningHallsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ScreeningHallsActions.getAllScreeningHalls),
      exhaustMap(() =>
        this.screeningHallsApiService.getScreeningHalls().pipe(
          catchError((error) => {
            this.snackBarService.openSnackBar(
              'Akcja nie powiodła sie, spróbuj ponownie później',
              3000
            );
            return throwError(() => new Error(error));
          })
        )
      ),
      map((screeningHalls) =>
      ScreeningHallsAPIActions.getAllScreeningHallsSuccess({ screeningHallsList: screeningHalls })
      )
    );
  });
}
