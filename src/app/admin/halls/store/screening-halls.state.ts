import { ScreeningHall } from "../screening-halls-api-service";


export interface ScreeningHallsState {
  screeningHallsList: ScreeningHall[];
}

export const screeningHallsFeatureKey = 'screeningHallsState';
export const initialScreeningHallsState: {
  screeningHallsList: ScreeningHall[];
} = {
  screeningHallsList: [],
};
