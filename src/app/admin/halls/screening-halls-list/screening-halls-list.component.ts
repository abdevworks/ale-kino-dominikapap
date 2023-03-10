import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ScreeningHallsActions } from '../store/screening-halls.actions';
import { selectScreeningHallsList } from '../store/screening-halls.selector';

@Component({
  selector: 'app-screening-halls-list',
  templateUrl: './screening-halls-list.component.html',
  styles: [
    `
    :host {
      padding-top: 120px;
    }
  `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreeningHallsListComponent implements OnInit{
  private store = inject(Store);
  screeningHalls$ = this.store.select(selectScreeningHallsList);

  ngOnInit() {
    this.store.dispatch(ScreeningHallsActions.getAllScreeningHalls());
  }
}
