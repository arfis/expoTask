import { Attribute } from './Attribute';
import {v4 as uuid} from 'uuid';

export class Step {
  id;
  name;
  index;
  events: Attribute[];

  constructor(index, name?, events = []) {
    this.id = uuid();
    this.name = name;
    this.index = index;
    this.events = events;
  }
}
