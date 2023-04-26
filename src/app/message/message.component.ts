import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
  <div *ngIf="isError()"
    class="p-message p-message-error">
    {{ text }}
  </div>
  `,
  styles: [`
    .p-message-error {
      margin: 0;
      margin-top: 4px;
      padding: 10px;
    }
  `]
})
export class MessageComponent implements OnInit {

  @Input() error: string = '';
  @Input() control?: FormControl;
  @Input() text: string = '';

  constructor() { }

  ngOnInit(): void { }

  isError(): boolean {
    return this.control ? this.control.hasError(this.error) && this.control.dirty : true;
  }

}
