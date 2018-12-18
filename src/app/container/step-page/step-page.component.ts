import { Component, OnDestroy } from '@angular/core';
import { StepsService } from '../../shared/steps/steps.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'ms-step-page',
  templateUrl: './step-page.component.html',
  styleUrls: ['./step-page.component.scss']
})
export class StepPageComponent implements OnDestroy {

  steps = [];
  eventAttributes = [];
  subscriptions = [];

  constructor(private stepService: StepsService) {
    stepService.getEventAttributes()
      .pipe(take(1))
      .subscribe(
        eventAttributes => this.eventAttributes = eventAttributes
      );

    this.subscriptions.push(stepService.stepEmitter.subscribe(
      steps => this.steps = steps
    ));
  }

  addStep() {
    const step = this.stepService.createStep(this.eventAttributes[0].name);
    this.steps.push(step);
  }

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
