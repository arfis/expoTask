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
  // existingData = ['python_1', 'python_2', 'python_3', 'test123', 'test321',
  //   'qweqwe', 'pyth123', 'qweqweqw', 'ewqeqwewqd', 'dsadasdasas', '1', '2', '3', '4','python_1', 'python_2', 'python_3', 'test123', 'test321',
  //   'qweqwe', 'pyth123', 'qweqweqw', 'ewqeqwewqd', 'dsadasdasas', '1', '2', '3', '4'];

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

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
