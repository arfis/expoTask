import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
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
  @Output('onClone') onCloneEmitter = new EventEmitter();
  @Output('onDelete') onDeleteEmitter = new EventEmitter();

  changeStep(step) {
    const {events, name} = step;
    this.step.events = events;
    this.step.name = name;
    this.onChangeEmitter.next(this.step);
  }

  cloneStep() {
    this.onCloneEmitter.next(this.step);
  }

  deleteStep() {
    this.onDeleteEmitter.next(this.step);
  }

  get index() {
    return this.step.index;
  }

  get name() {
    return this.step.name;
  }
}
