import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  imports: [NgIf],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.css'
})
export class ConfirmModalComponent {
  @Input() message: string = 'Are you sure you want to delete this?';
  @Input() visible: boolean = true;
  @Output() confirm = new EventEmitter<boolean>();

  onConfirm() : void
  {
    this.confirm.emit(true);
  }

  onCancel(): void 
  {
    this.confirm.emit(false);
  }

}
