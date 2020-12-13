import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacion-dialog',
  templateUrl: './confirmacion-dialog.component.html',
  styleUrls: ['./confirmacion-dialog.component.scss']
})
export class ConfirmacionDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ConfirmacionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
