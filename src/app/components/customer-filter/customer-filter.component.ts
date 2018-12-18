import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Filter } from '../../model/Filter';

@Component({
  selector: 'ms-customer-filter',
  templateUrl: './customer-filter.component.html',
  styleUrls: ['./customer-filter.component.scss']
})
export class CustomerFilterComponent implements OnInit {

  @Output('onAddStep') onAddStepEmitter = new EventEmitter();

  filters: Filter[];

  constructor() { }

  ngOnInit() {
  }

  resetFilters() {

  }

  applyFilters() {
    console.log(this.filters);
  }

  addStep() {
    this.onAddStepEmitter.next();
  }
}
