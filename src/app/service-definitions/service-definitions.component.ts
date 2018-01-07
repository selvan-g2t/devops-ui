import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-definitions',
  templateUrl: './service-definitions.component.html',
  styleUrls: ['./service-definitions.component.css']
})
export class ServiceDefinitionsComponent implements OnInit {
searchFilterMessage:string
  constructor() { }

  ngOnInit() {
  }
   getMessage(message){
    this.searchFilterMessage=message;
 }
}
