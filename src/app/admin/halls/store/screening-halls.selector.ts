import { createSelector } from '@ngrx/store';
import { ScreeningHallsState } from './screening-halls.state';

const selectScreeningHallsState = (state: { screeningHallsState: ScreeningHallsState }) =>
  state.screeningHallsState;

export const selectScreeningHallsList = createSelector(
  selectScreeningHallsState,
  (state) => state.screeningHallsList
);
