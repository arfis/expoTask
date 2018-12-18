import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { of } from 'rxjs';
import { Step } from '../../model/Step';

@Injectable({
  providedIn: 'root'
})
export class StepsService {

  stepEmitter = new Subject<Step[]>();

  steps = [];

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

  updateStep(step) {
    this.steps[step.index] = step;
  }

  resetSteps() {
    this.steps = [];
    this.stepEmitter.next(this.steps);
  }

  createStep(name) {
    const step = new Step(this.steps.length, name);
    this.steps.push(step);
    this.stepEmitter.next(this.steps);
  }

  getEventAttributes(): Observable<any[]> {
    return of(this.eventAttributes);
  }
}
