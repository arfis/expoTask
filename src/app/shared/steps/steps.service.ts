import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { of } from 'rxjs';
import { Step } from '../../model/Step';

@Injectable({
  providedIn: 'root'
})
export class StepsService {

  resetEmitter = new Subject();

  steps: Step[] = [];

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

  updateStep(step: Step) {
    this.steps[step.index] = step;
  }

  resetSteps() {
    this.steps = [];
    this.resetEmitter.next();
  }

  createStep(name) {
    const step = new Step(this.steps.length, name);
    this.steps.push(step);
    return step;
  }

  cloneStep(step) {
    const {name, events} = step;
    const clone = new Step(this.steps.length, name, events);
    this.steps.push(clone);
    return clone;
  }

  deleteStep(step) {
    const steps = this.steps
      .filter(actualStep => actualStep.id !== step.id)
      .map((actualStep, index) => {
        actualStep.index = index;
        return actualStep;
      })
    this.steps = [...steps];
    return steps;
  }

  getEventAttributes(): Observable<any[]> {
    return of(this.eventAttributes);
  }
}
