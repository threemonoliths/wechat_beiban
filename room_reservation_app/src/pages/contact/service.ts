import { Injectable } from '@angular/core';
import{ contactpages} from './contactpage';
import{ pages} from './page';
// import { Observable, of } from 'rxjs';
@Injectable()
export class ContactService {

  constructor() { }
  getPages() {
    return pages;
  } 
}