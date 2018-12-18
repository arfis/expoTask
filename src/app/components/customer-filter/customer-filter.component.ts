import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Filter } from '../../model/Filter';
import { StepsService } from '../../shared/steps/steps.service';

@Component({
  selector: 'ms-customer-filter',
  templateUrl: './customer-filter.component.html',
  styleUrls: ['./customer-filter.component.scss']
})
export class CustomerFilterComponent implements OnInit {

  @Output('onAddStep') onAddStepEmitter = new EventEmitter();

  constructor(private stepService: StepsService) {
  }

  ngOnInit() {
  }

  resetFilters() {
    this.stepService.resetSteps();
  }

  applyFilters() {
    console.log(this.stepService.steps);
  }

  addStep() {
    this.onAddStepEmitter.next();
  }
}
