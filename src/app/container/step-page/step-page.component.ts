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
  existingData = [];

  constructor(private stepService: StepsService) {
    stepService.getEventAttributes()
      .pipe(take(1))
      .subscribe(
        eventAttributes => {
          this.eventAttributes = eventAttributes;
          this.existingData = eventAttributes.map(item => item.name);
        }
      );

    this.subscriptions.push(stepService.resetEmitter.subscribe(
      () => {
        this.steps = [];
      }
    ));
  }

  onStepChange(step) {
    this.stepService.updateStep(step);
  }

  addStep() {
    const step = this.stepService.createStep(this.eventAttributes[0].name);
    this.steps.push(step);
  }

  cloneStep(step) {
    const clone = this.stepService.cloneStep(step);
    this.steps.push(clone);
  }

  deleteStep(step) {
    const steps = this.stepService.deleteStep(step);
    this.steps = steps;
  }
  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
