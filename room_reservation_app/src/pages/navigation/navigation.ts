import { Component, OnInit } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from 'ionic-angular';

declare var  AMap: any; 
@Component({
  selector: 'page-navigation',
  templateUrl: 'navigation.html'
})
export class NavigationPage implements OnInit {
  


  constructor(
    public navCtrl: NavController, 
    
  ) {
    
  
  }

  ngOnInit() {
    this.getMap ();
   
  }

  getMap(){
    let map = new AMap.Map('container', {
      resizeEnable: true,
      zoom:11,
      center: [116.29342, 39.93706]
      //39.9370600000,116.2934200000
    });

    let marker = new AMap.Marker({
      icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
      position: [116.29342, 39.93706]
    });

    var text = new AMap.Text({
      text:'我们在这里',
      textAlign:'center', // 'left' 'right', 'center',
      verticalAlign:'middle', //middle 、bottom
      draggable:true,
      cursor:'pointer',
      angle:10,
      style:{
          'background-color':'yellow',
          'border':'solid 1px #0088ff',
          'padding':'10px 20px'
      },
      position: [116.29342, 39.93706]
  });
  text.setMap(map);

    // marker.setMap(map)
  }



}
