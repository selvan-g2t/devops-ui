import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-external-systems',
  templateUrl: './external-systems.component.html',
  styleUrls: ['./external-systems.component.css']
})
export class ExternalSystemsComponent implements OnInit {
searchFilterMessage:string
  constructor() { }

  ngOnInit() {
  }
   getMessage(message){
    this.searchFilterMessage=message;
 }
}
