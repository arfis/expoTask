import { ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ms-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectInputComponent),
      multi: true
    }]
})
export class SelectInputComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @ViewChild('searchInput') input;

  @Input('delay') delay = 0;
  @Input('data') data = [];

  @Output('onSelectionChange') onSelectionChangeEmitter = new EventEmitter<string>();

  searchValue;
  foundData;
  subscription;
  value;

  private propagateChange = (_: any) => {
  };

  constructor(private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.subscription = fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(this.delay),
        distinctUntilChanged())
      .subscribe(
        event => {
          const { key } = event as KeyboardEvent;
          if (key === 'Enter') {
            this.setupInput(this.value);
          } else {
            this.searchValue = this.value;
            this.foundData = this.searchInData(this.searchValue);
            this.ref.markForCheck();
          }
        }
      );
  }

  searchInData(word) {
    const foundData = this.data.filter(data => data.indexOf(word) > -1);
    return foundData;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setupInput(word) {
    this.value = word;
    this.foundData = null;
    this.propagateChange(this.value);
    this.onSelectionChangeEmitter.next(word);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
    if (obj) {
      this.value = obj;
    }
  }
}
