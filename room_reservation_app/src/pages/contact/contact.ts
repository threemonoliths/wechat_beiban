import { Component,OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import{ contactpages}from'./contactpage';
import { ContactService } from './service';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage implements OnInit {
  pages:contactpages[];

  constructor(public navCtrl: NavController,private contactService: ContactService) {}

  ngOnInit() {
    this.getPages();
  }
 
  getPages():void {
    this.pages = this.contactService.getPages()
    
  }
  
}
