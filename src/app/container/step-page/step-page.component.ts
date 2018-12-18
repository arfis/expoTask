import { Component, OnInit } from '@angular/core';
import { Step } from '../../model/Step';
import { StepsService } from '../../shared/steps/steps.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'ms-step-page',
  templateUrl: './step-page.component.html',
  styleUrls: ['./step-page.component.scss']
})
export class StepPageComponent {

  steps = [];
  eventAttributes = [];

  constructor(private stepService: StepsService) {
    stepService.getEventAttributes()
      .pipe(take(1))
      .subscribe(
        eventAttributes => this.eventAttributes = eventAttributes
      );
  }

  addStep() {
    const step = this.stepService.createStep(this.eventAttributes[0].name)
    this.steps.push(step);
  }

}
