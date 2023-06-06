import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-detail',
  templateUrl: './info-detail.component.html',
  styleUrls: ['./info-detail.component.scss']
})
export class InfoDetailComponent {
  @Input() name:any;
  @Input() dni:any;
  @Input() getCheck:any;
  @Input() sequence:any;

  constructor(){

  }
}
