import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-url-types',
  templateUrl: './url-types.component.html',
  styleUrls: ['./url-types.component.css']
})
export class UrlTypesComponent implements OnInit {
searchFilterMessage:string
  constructor() { }

  ngOnInit() {
  }
   getMessage(message){
    this.searchFilterMessage=message;
 }
}
