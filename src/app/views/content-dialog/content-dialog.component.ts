import { Component, OnInit, Inject, Input } from '@angular/core';
import { ContentBlockEditComponent } from '@shared/content/content-block-edit/content-block-edit.component';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';

import { ContentBlockModel } from '@shared/models/content-block.model';
import { ContentBlockService } from '@shared/services/content-block.service';

@Component({
  selector: 'app-content-dialog',
  templateUrl: './content-dialog.component.html',
  styleUrls: ['./content-dialog.component.css']
})
export class ContentDialogComponent implements OnInit {

  @Input() id;
  @Input() title;
  @Input() slug;
  @Input() subTitle;
  @Input() body;
  @Input() image;
  @Input() elementType;
  @Input() editComponent;
  @Input() viewComponent;

  @Input() disabled;

  constructor(public dialogRef: MatDialogRef<ContentDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: ContentBlockModel, private _service: ContentBlockService) { 
    console.log('INJECTED data: ', data);
  }

  ngOnInit() {
    if (this.data) {
      this.title = this.data.title;
      this.subTitle = this.data.subTitle;
      this.body = this.data.body;
      this.slug = this.data.slug;
      this.image = this.data.image;
      this.viewComponent = this.data.viewComponent;
      this.editComponent = this.data.editComponent;
      this.id = this.data.id;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveBlock() {
    const u = {
      id: this.id,
      title: this.title,
      subTitle: this.subTitle,
      body: this.body,
      slug: this.slug,
      image: this.image,
      editComponent: this.editComponent,
      viewComponent: this.viewComponent
    };
    console.log('about to save:', u);
    
    this._service.update(u).catch(err => {
      console.log('Error saving contentBlock ' + this.slug);
    }).then((r) => {
      console.log('Saved ' + this.slug);
      this.dialogRef.close();
    });
  }

}
