import { Component, OnInit, Input } from '@angular/core';

import { ContentBlockService } from '@shared/services/content-block.service';
import { ContentBlockModel } from '@shared/models/content-block.model';

@Component({
  selector: 'app-content-block',
  templateUrl: './content-block.component.html',
  styleUrls: ['./content-block.component.css']
})
export class ContentBlockComponent implements OnInit {

  @Input() slug;

  body: string;

  content: ContentBlockModel;

  constructor(private _service: ContentBlockService) { }

  ngOnInit() {
    //console.log('SLUG', this.slug);
    this._service.getBy('slug', '==', this.slug).catch(err => {
      console.log('Content block "' + this.slug + '" throws error', err);
    }).then((result) => {
      console.log('ContentBlock:', result);
      if (!result || (result.length < 1)) {
        const c: ContentBlockModel = {
          slug: this.slug,
          body: '',
          editComponent: 'content-block',
          viewComponent: 'content-block-html',
          elementType: 'card',
          title: '',
          subTitle: '',
          image: ''
        };
        this._service.add(c).catch(err => {
          console.log('Error adding content block ' + this.slug, err);
        }).then((res) => {
          this.body = res['body'];
          this.populateContent(res);
        });
      } else {
        this.body = result[0]['body'];
        this.populateContent(result[0]);
      }
    });
  }

  populateContent(obj) {
    this.content = {
      id: obj['id'],
      body: obj['body'],
      title: obj['title'],
      subTitle: obj['subTitle'],
      slug: obj['slug'],
      elementType: obj['elementType'],
      editComponent: obj['editComponent'],
      viewComponent: obj['viewComponent'],
      image: obj['image']
    };
  }

}
