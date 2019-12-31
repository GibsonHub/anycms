import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-block',
  templateUrl: './card-block.component.html',
  styleUrls: ['./card-block.component.scss']
})
export class CardBlockComponent {
  @Input() titleCard;
  @Input() numberCard = 8;
  @Input() subTitleCard;
  @Input() contentCard = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nisl ligula.';
  @Input() angularImage: string;

  constructor() {
    this.angularImage = '/assets/img/angular2.png'; }

}
