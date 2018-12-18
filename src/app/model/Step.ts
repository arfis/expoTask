import { Event } from './Event';
import { Filter } from './Filter';

export class Step {
  name;
  index;
  selecterdEvent: Event;
  eventAttributes: Event[];

  constructor(index, name?, eventAttribute?) {
    this.name = name;
    this.index = index;
    this.eventAttributes = eventAttribute;
  }
}
