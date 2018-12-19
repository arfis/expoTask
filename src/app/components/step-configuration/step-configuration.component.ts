import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Operation } from '../../model/Operation';

@Component({
  selector: 'ms-step-configuration',
  templateUrl: './step-configuration.component.html',
  styleUrls: ['./step-configuration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepConfigurationComponent implements OnInit, OnChanges {

  @Input('eventAttributes') eventAttributes;
  @Input('step') step;
  @Output('onValueChanges') valueChanges = new EventEmitter();

  configurationForm;
  eventNames = [];
  operations = [
    {
      title: 'operation.equal',
      value: Operation.EQUAL_TO
    },
    {
      title: 'operation.smallerThan',
      value: Operation.LESS_THAN
    },
    {
      title: 'operation.biggerThan',
      value: Operation.GREATER_THAN
    },
    {
      title: 'operation.inBetween',
      value: Operation.IN_BETWEEN
    }
  ];

  constructor(private fb: FormBuilder) {
    this.configurationForm = this.fb.group({
      name: [''],
      events: this.fb.array([])
    });
  }

  ngOnInit() {
    this.configurationForm.valueChanges.subscribe(
      form => {
        this.valueChanges.next(form);
      }
    );

    this.setupEventNames();
  }

  ngOnChanges(changes) {
    if (changes.eventAttributes) {
      this.setupEventNames();
    }
    if (changes.step) {
      if (this.step && this.configurationForm) {
        const {events} = this.step;
        const missingAttributesCount = events.length - this.events.length;

        for (let index = 0; index < missingAttributesCount; index++) {
          this.addEvent();
        }
        this.configurationForm.patchValue(this.step);
      }
    }
  }

  addEvent() {
    const event = this.fb.group({
      'name': [this.eventAttributes[0].attributes[0]],
      'operation': [this.operations[0].value],
      'value': [''],
      'valueTo': ['']
    });
    this.events.push(event);
  }

  removeRow(index) {
    this.events.removeAt(index);
  }

  isBetween(index) {
    return this.events.at(index).value.operation === Operation.IN_BETWEEN;
  }

  private setupEventNames() {
    this.eventNames = this.eventAttributes.map(event => event.name);
  }

  get events() {
    return this.configurationForm.get('events') as FormArray;
  }

  get addEventString() {
    return this.events.controls.length > 0 ? 'step.refineMore' : 'step.addEvent';
  }

  get selectedEvent() {
    return this.configurationForm.get('name').value;
  }

  get selectedEventAttributes() {
    const selectedEvent = this.eventAttributes.find(attribute => attribute.name === this.selectedEvent);
    return selectedEvent ? selectedEvent.attributes : [];
  }

}
