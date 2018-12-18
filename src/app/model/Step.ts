import { Event } from './Event';
import { Filter } from './Filter';
import { ConfiguredAttribute } from './Attribute';

export class Step {
  name;
  index;
  events: ConfiguredAttribute[];

  constructor(index, name?, events?) {
    this.name = name;
    this.index = index;
    this.events = events;
  }
}
