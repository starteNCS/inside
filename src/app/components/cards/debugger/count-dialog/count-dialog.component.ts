import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-count-dialog',
  templateUrl: './count-dialog.component.html',
  styleUrls: ['./count-dialog.component.scss']
})
export class CountDialogComponent {

  public count = 1000;

  constructor(public dialogRef: MatDialogRef<CountDialogComponent>) { }

  run(): void {
    this.dialogRef.close()
  }

}
