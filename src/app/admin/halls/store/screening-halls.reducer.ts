/* eslint-disable @ngrx/on-function-explicit-return-type */
import { createReducer, on } from '@ngrx/store';
import { ScreeningHallsAPIActions } from './screening-halls.actions';
import { initialScreeningHallsState } from './screening-halls.state';

export const screeningHallsReducer = createReducer(
  initialScreeningHallsState,

  on(ScreeningHallsAPIActions.addNewScreeningHallSuccess, (state, action) => {
    return {
      ...state,
      screeningHallsList: [...state.screeningHallsList, action],
    };
  }),
  on(
    ScreeningHallsAPIActions.getAllScreeningHallsSuccess,
    (state, { screeningHallsList }) => ({
      ...state,
      screeningHallsList: [...screeningHallsList],
    })
  )
);
