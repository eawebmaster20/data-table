import { JsonPipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
@Component({
  selector: 'app-base-modal',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, JsonPipe],
  templateUrl: './base-modal.component.html',
  styleUrl: './base-modal.component.scss'
})
export class BaseModalComponent {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data:any) {}
}
