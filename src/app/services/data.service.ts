import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  getNations() {
    return of([
      {
        value: null,
        label: '---',
      },
      {
        value: 1,
        label: 'Germany',
      },
      {
        value: 2,
        label: 'Italy',
      },
    ]);
  }

  getCities(nationId: number) {
    return of(
      [
        {
          value: 1,
          label: 'City It 1',
          nationId: 2,
        },
        {
          value: 2,
          label: 'City It 2',
          nationId: 2,
        },
        {
          value: 3,
          label: 'City Ger 1',
          nationId: 1,
        },
        {
          value: 4,
          label: 'City Ger 2',
          nationId: 1,
        },
      ].filter((entry) => {
        if (!nationId) return true;

        return entry.nationId === nationId;
      })
    );
  }
}
