import { ScreeningHall } from './../screening-halls-api-service';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ScreeningHallsActions = createActionGroup({
  source: 'ScreeningHalls',
  events: {
    'add new screening hall': props<Partial<Omit<ScreeningHall, 'id'>>>(),
    'get all screening halls': emptyProps(),
  },
});

export const ScreeningHallsAPIActions = createActionGroup({
  source: 'ScreeningHalls API',
  events: {
    ['add new screening hall success']: props<ScreeningHall>(),
    ['add new screening hall failure']: emptyProps(),
    ['get all screening halls success']: props<{ screeningHallsList: ScreeningHall[] }>(),
    ['get all screening halls failure']: emptyProps(),
  }
})
