import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ms-step-header',
  templateUrl: './step-header.component.html',
  styleUrls: ['./step-header.component.scss']
})
export class StepHeaderComponent implements OnInit {

  @Input('index') index;
  @Input('title') title;
  @Input('stepName') stepName;

  constructor() { }

  ngOnInit() {
  }

}
