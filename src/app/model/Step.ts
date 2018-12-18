import { Attribute } from './Attribute';

export class Step {
  name;
  index;
  events: Attribute[];

  constructor(index, name?, events = []) {
    this.name = name;
    this.index = index;
    this.events = events;
  }
}
