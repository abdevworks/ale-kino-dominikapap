import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ScreeningHall {
  id: number;
  name: string;
  rows: number;
  columns: number;
}

@Injectable({
  providedIn: 'root',
})
export class ScreeningHallsApiService {
  private http = inject(HttpClient);

  getScreeningHalls(): Observable<ScreeningHall[]> {
    return this.http.get<ScreeningHall[]>(
      '/screeninghalls?_sort=name&_order=asc'
    );
  }

  add(hallData: Partial<Omit<ScreeningHall, 'id'>>) {
    return this.http.post<ScreeningHall>('/screeninghalls', {
      ...hallData,
    });
  }
}
