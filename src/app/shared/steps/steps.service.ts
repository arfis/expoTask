import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepsService {

  eventAttributes = [
    {
      name: 'python_script_event_1',
      attributes: ['count', 'index', 'position']
    },
    {
      name: 'python_script_event_2',
      attributes: ['count', 'index', 'position']
    },
    {
      name: 'python_script_event_3',
      attributes: ['name', 'sth', 'position']
    }
  ];

  constructor() {
  }

  getEventAttributes(): Observable<any[]> {
    return of(this.eventAttributes);
  }
}
