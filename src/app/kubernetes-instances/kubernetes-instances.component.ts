import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kubernetes-instances',
  templateUrl: './kubernetes-instances.component.html',
  styleUrls: ['./kubernetes-instances.component.css']
})
export class KubernetesInstancesComponent implements OnInit {
searchFilterMessage:string
  constructor() { }

  ngOnInit() {
  }
   getMessage(message){
    this.searchFilterMessage=message;
 }
}
