import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'ms-step-configuration',
  templateUrl: './step-configuration.component.html',
  styleUrls: ['./step-configuration.component.scss']
})
export class StepConfigurationComponent implements OnInit {

  @Input('eventAttributes') eventAttributes;

  configurationForm;
  operations = ['operation.equal', 'operation.smallerThan', 'operation.biggerThan'];

  constructor(private fb: FormBuilder) {
    this.configurationForm = fb.group({
      selectedEvent: [''],
      events: this.fb.array([])
    });
  }

  addEvent() {
    const event = this.fb.group({
      'name': [''],
      'operation': [''],
      'value': ['ks']
    });
    this.events.push(event);
  }


  get events() {
    return this.configurationForm.get('events') as FormArray;
  }

  get addEventString() {
    return this.events.controls.length > 0 ? 'step.refineMore' : 'step.addEvent';
  }

  get selectedEvent() {
    return this.configurationForm.get('selectedEvent');
  }

  ngOnInit() {
  }

}
