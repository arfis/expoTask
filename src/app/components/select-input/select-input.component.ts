import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef, HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
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
  @Input('fixed') fixed = false;

  @Output('onSelectionChange') onSelectionChangeEmitter = new EventEmitter<string>();

  foundData;
  subscription;
  value = '';

  private propagateChange = (_: any) => {
  };


  @HostListener('document:click', ['$event'])
  onClick(event) {
    if (this.element.nativeElement.contains(event.target)) {
      this.setupResult(this.value);
    } else {
      this.foundData = [];
    }
  }

  constructor(private ref: ChangeDetectorRef,
              private element: ElementRef) {
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
            this.setupResult(this.value);
          }
        }
      );
  }

  setupResult(word) {
    if (!this.fixed) {
      this.foundData = this.searchInData(word);
    } else {
      this.foundData = this.data;
    }
    this.ref.markForCheck();
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
