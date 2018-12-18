import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ms-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepComponent implements OnInit {

  @Input('step') step;
  @Input('eventAttributes') eventAttributes;

  constructor() {
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
