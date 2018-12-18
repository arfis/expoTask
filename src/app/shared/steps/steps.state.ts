import { State } from '@ngxs/store';

@State<string[]>({
  name: 'steps',
  defaults: []
})
export class StepsState {
}
