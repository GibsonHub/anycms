import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ContentDialogComponent } from '../content-dialog/content-dialog.component';

@Component({
  selector: 'app-content-material-card',
  templateUrl: './content-material-card.component.html',
  styleUrls: ['./content-material-card.component.css']
})
export class ContentMaterialCardComponent implements OnInit {

  @Input() title;
  @Input() subTitle;
  @Input() body;
  @Input() image;

  @Input() contentBlock;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ContentDialogComponent, {
      width: '100vw',
      height: '80vh',
      data: this.contentBlock
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   // this.animal = result;
    // });
  }

}
