import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-push',
  templateUrl: './modal-push.component.html',
  styleUrls: ['./modal-push.component.scss'],
})
export class ModalPushComponent implements OnInit {
  public form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalPushComponent>
  ) {}

  public ngOnInit(): void {
    this.form = this.fb.group({
      push_message: [''],
    });
  }

  public save(): void {
    this.dialogRef.close(this.form.value);
  }

  public close(): void {
    this.dialogRef.close();
  }
}
