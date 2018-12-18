import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StepsService } from '../../shared/steps/steps.service';

@Component({
  selector: 'ms-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepComponent implements OnInit {

  @Input('step') step;
  @Input('eventAttributes') eventAttributes;
  @Output('onChange') onChangeEmitter = new EventEmitter();

  constructor(private stepService: StepsService) {
  }

  changeStep(step) {
    this.step = {...this.step, ...step};
    this.onChangeEmitter.next(this.step);
    this.stepService.updateStep(this.step);
  }

  ngOnInit() {
  }

  get index() {
    return this.step.index;
  }

  get name() {
    return this.step.name;
  }
}
