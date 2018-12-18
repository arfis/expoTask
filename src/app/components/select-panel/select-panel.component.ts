import { ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'ms-select-panel',
  templateUrl: './select-panel.component.html',
  styleUrls: ['./select-panel.component.scss']
})
export class SelectPanelComponent implements OnChanges {

  selectedIndex = -1;

  @Input('data') data;
  @Output('onSelection') onSelectionEmitter = new EventEmitter<string>();

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event) {
    const { key } = event;

    switch (key) {
      case 'ArrowDown': {
        if (this.selectedIndex < this.data.length - 1) {
          this.selectedIndex++;
        }
        break;
      }
      case 'ArrowUp' : {
        if (this.selectedIndex > 0) {
          this.selectedIndex--;
        }
        break;
      }
      case 'Enter': {
        this.emitSelection();
      }
    }
  }

  constructor(private ref: ChangeDetectorRef) {
  }

  ngOnChanges(changes) {
    if (this.data.length === 1) {
      this.selectedIndex = 0;
      this.ref.markForCheck();
    }
  }

  emitSelection() {
    if (this.selectedIndex > -1) {
      this.onSelectionEmitter.next(this.data[this.selectedIndex]);
      this.selectedIndex = -1;
    }
  }
}
