import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StepsService } from '../../shared/steps/steps.service';
import { Step } from '../../model/Step';

@Component({
  selector: 'ms-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepComponent {

  @Input('step') step: Step;
  @Input('eventAttributes') eventAttributes;
  @Output('onChange') onChangeEmitter = new EventEmitter();

  constructor(private stepService: StepsService) {
  }

  changeStep(step) {
    const {events, name} = step;
    this.step.events = events;
    this.step.name = name;
    this.onChangeEmitter.next(this.step);
    this.stepService.updateStep(this.step);
  }

  get index() {
    return this.step.index;
  }

  get name() {
    return this.step.name;
  }
}
